import Joi from "joi";

export const normalizeJoiError = (error: Joi.ValidationError | undefined) => {
  const errorObject: { [key: string]: string } = {};

  if (error) {
    error.details.forEach((detail) => {
      errorObject[detail.path[0]] = detail.message;
    });
  }

  return errorObject;
};
