import winston from "winston";
import morgan from "morgan";

const { printf, timestamp, colorize, errors, combine } = winston.format;

const logFormat = printf(({ timestamp, level, stack, message }) => {
  return stack
    ? `${timestamp} ${level}: ${message}\n${stack}`
    : `${timestamp} ${level}: ${message}`;
});

// config logger
const logger = winston.createLogger({
  level: "http", // default level
  format: combine(timestamp(), errors({ stack: true }), logFormat),
  transports: [
    new winston.transports.File({ filename: "logs/combined.log" }),
    new winston.transports.File({
      filename: "logs/errors.log",
      level: "error",
    }),
  ],
});

// Log only in development environment
if (process.env.NODE_ENV === "development") {
  logger.add(
    new winston.transports.Console({
      format: combine(colorize(), timestamp(), logFormat),
    })
  );
}

export { logger };
