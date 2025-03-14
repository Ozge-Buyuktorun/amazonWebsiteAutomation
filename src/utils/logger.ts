import winston from "winston";
import path from "path";

// Log levels with priorities
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Emojis per log level
const levelIcons: Record<string, string> = {
  error: "❌",
  warn: "⚠️",
  info: "ℹ️",
  http: "🌐",
  debug: "🐛",
};

// Colors for terminal
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "blue",
};

winston.addColors(colors);

// Custom log format
const customFormat = winston.format.printf((info) => {
  const timestampStr = info.timestamp as string;
  const dateObj = new Date(timestampStr);
  const date = dateObj.toISOString().split("T")[0];
  const time = dateObj
    .toTimeString()
    .split(" ")[0]
    .concat(`:${dateObj.getMilliseconds().toString().padStart(4, "0")}`);

  const icon = levelIcons[info.level] || "";
  const levelUpper = info.level.toUpperCase();
  return `[Date:${date}]-[Hour:${time}]-[${icon}] [${levelUpper} Level: ${info.message}]`;
});

// Combined format: timestamp, colorize, customFormat
const format = winston.format.combine(
  winston.format.timestamp(),
  winston.format.colorize({ all: true }),
  customFormat
);

// Transports (Console and File)
const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: path.join(__dirname, "../../logs/all.log"),
  }),
  new winston.transports.File({
    filename: path.join(__dirname, "../../logs/error.log"),
    level: "error",
  }),
];

// Create logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  levels,
  format,
  transports,
});

export default logger;
