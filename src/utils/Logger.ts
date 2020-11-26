import fs from 'fs';
import path from 'path';
import { createLogger, transports, format, Logger } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const ERROR_DIR_NAME = 'errors';
const EXCEPTION_DIR_NAME = 'uncaught-exceptions';
export const LOGS_DIR = process.env.LOGS_DIR ? process.env.LOGS_DIR : path.resolve('./logs');
export const LOG_DIR_ERRORS = path.join(LOGS_DIR, ERROR_DIR_NAME);
export const LOG_DIR_UNCAUGHT_EXCEPTIONS = path.join(LOGS_DIR, EXCEPTION_DIR_NAME);

const logger = createLogger({
  format: format.combine(format.errors({ stack: true }), format.splat(), format.prettyPrint()),
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});

addErrorLog(logger);
addExceptionHandlerLog(logger);

function addErrorLog(logger: Logger) {
  if (!fs.existsSync(LOG_DIR_ERRORS)) {
    fs.mkdirSync(LOG_DIR_ERRORS, { recursive: true });
  }
  const errorOptions = {
    file: {
      level: 'warn',
      dirname: LOG_DIR_ERRORS,
      filename: `${ERROR_DIR_NAME}-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      format: format.combine(format.timestamp(), format.prettyPrint()),
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    },
  };
  logger.add(new DailyRotateFile(errorOptions.file));
}

function addExceptionHandlerLog(logger: Logger) {
  if (!fs.existsSync(LOG_DIR_UNCAUGHT_EXCEPTIONS)) {
    fs.mkdirSync(LOG_DIR_UNCAUGHT_EXCEPTIONS, { recursive: true });
  }
  const exceptionsOptions = {
    file: {
      level: 'warn',
      dirname: LOG_DIR_UNCAUGHT_EXCEPTIONS,
      filename: `${EXCEPTION_DIR_NAME}-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      format: format.combine(format.timestamp(), format.prettyPrint()),
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    },
  };
  logger.exceptions.handle(new DailyRotateFile(exceptionsOptions.file));
}

export function reportCriticalErrorBadConf(message: string): void {
  logger.error(message);
  logger.error(`See the logs file in ${LOG_DIR_UNCAUGHT_EXCEPTIONS}.`);
}

export function reportCriticalError(message: string): void {
  logger.error(message);
}

export default logger;
