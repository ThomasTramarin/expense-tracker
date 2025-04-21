import Joi from "joi";

export const normalizeJoiError = (error: Joi.ValidationError | undefined) => {
  return error?.details.map((err) => ({
    field: err.context?.key,
    message: err.message,
  }));
};
