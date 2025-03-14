import winston from 'winston';
import path from 'path';

// Log düzeylerini ve renklerini tanımlama
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

// Winston'a renkleri tanıtma
winston.addColors(colors);

// Loglama formatını tanımlama
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// Transportları tanımlama
const transports = [
  // Konsola loglama
  new winston.transports.Console(),
  // Dosyaya loglama (tüm loglar)
  new winston.transports.File({
    filename: path.join(__dirname, '../../logs/all.log'),
  }),
  // Dosyaya loglama (sadece hatalar)
  new winston.transports.File({
    filename: path.join(__dirname, '../../logs/error.log'),
    level: 'error',
  }),
];

// Logger oluşturma
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  levels,
  format,
  transports,
});

export default logger;