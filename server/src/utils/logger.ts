import winston from "winston";

const { combine, timestamp, colorize, printf, errors, json } = winston.format;

const consoleFormat = combine(
  colorize(),
  timestamp(),
  errors({ stack: true }),
  printf(({ level, message, timestamp, stack, ...meta }) => {
    return `[${timestamp}] ${level}: ${stack || message} ${
      Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
    }`;
  })
);

const fileFormat = combine(
  timestamp(),
  errors({ stack: true }),
  json()
);

const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
      format: consoleFormat
    }),

    new winston.transports.File({
      filename: "log/error.log",
      level: "error",
      format: fileFormat
    }),

    new winston.transports.File({
      filename: "log/combined.log",
      format: fileFormat
    })
  ]
});

export default logger;
