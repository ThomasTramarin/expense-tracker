import { logger } from "../../config/logger";
import prisma from "../../config/prisma";
import { ApiError } from "../../utils/ApiError";
import bcrypt from "bcryptjs";

interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async ({ name, email, password }: RegisterDTO) => {
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
