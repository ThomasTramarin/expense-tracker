import { logger } from "../../config/logger";
import prisma from "../../config/prisma";
import { ApiError } from "../../utils/ApiError";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/jwt";

interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  // Check if user with given email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    logger.info(`User already exists, email: ${email}`);
    throw new ApiError("User already exists", 409);
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const loginUser = async (email: string, password: string) => {
  // Check if the user exists
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!userExists) {
    logger.info(`User not found, email: ${email}`);
    throw new ApiError("Invalid credentials", 404);
  }

  // Check if the password is correct
  const idPasswordCorrect = await bcrypt.compare(password, userExists.password);

  if (!idPasswordCorrect) {
    logger.info(`Invalid password, email: ${email}`);
    throw new ApiError("Invalid credentials", 404);
  }

  // Generate a JWT token
  const token = generateToken(userExists.id);

  // Return the user
  return {
    id: userExists.id,
    name: userExists.name,
    email: userExists.email,
    token,
  };
};
