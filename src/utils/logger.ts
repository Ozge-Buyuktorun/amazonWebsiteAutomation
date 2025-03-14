import winston, { format, LoggerOptions } from 'winston';
import path from 'path';
import fs from 'fs';

type LogLevel = 'info' | 'warn' | 'error' | 'debug' | string;

/**
 * Converts a timestamp to a formatted Turkish date string.
 */
function formatTurkishDate(timestamp: string | number | Date): string {
  return new Date(timestamp).toLocaleString('tr-TR', {
    timeZone: 'Europe/Istanbul',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

/**
 * Styles the log level with ANSI colors and symbols.
 */
function styleLevel(level: LogLevel): string {
  switch (level) {
    case 'info':
      return `ℹ️  \u001b[1m\u001b[36m${level.toUpperCase()}\u001b[39m\u001b[22m`;
    case 'warn':
      return `⚠️  \u001b[1m\u001b[33m${level.toUpperCase()}\u001b[39m\u001b[22m`;
    case 'error':
      return `❌ \u001b[1m\u001b[31m${level.toUpperCase()}\u001b[39m\u001b[22m`;
    case 'debug':
      return `🔍 \u001b[1m\u001b[35m${level.toUpperCase()}\u001b[39m\u001b[22m`; // purple
    default:
      return level.toUpperCase();
  }
}

// Winston'ın beklediği TransformableInfo ile uyumlu format
const customFormat = format.printf((info) => {
  const level = info.level as LogLevel;
  const message = info.message as string;
  
  // timestamp değerini güvenli bir şekilde işleme
  let timestampValue: string | number | Date = new Date();
  
  // info.timestamp var mı kontrol et ve uygun tipe dönüştür
  if (info.timestamp) {
    if (typeof info.timestamp === 'string') {
      timestampValue = info.timestamp;
    } else if (typeof info.timestamp === 'number') {
      timestampValue = info.timestamp;
    } else if (info.timestamp instanceof Date) {
      timestampValue = info.timestamp;
    } else {
      // Winston timestamp'i string olarak ekler, ama ekstra kontrol için
      timestampValue = new Date().toISOString();
    }
  }
  
  const turkishDate = formatTurkishDate(timestampValue);
  const styledLevel = styleLevel(level);
  return `[${styledLevel}] [${turkishDate}] 📝 ${message}`;
});

// Ensure logs directory exists
const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Logger configuration options
const options: LoggerOptions = {
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    customFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      maxsize: 10 * 1024 * 1024, // 10 MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'all.log'),
      maxsize: 10 * 1024 * 1024, // 10 MB
      maxFiles: 5,
    })
  ]
};

// Create and export the logger
const logger = winston.createLogger(options);

export default logger;