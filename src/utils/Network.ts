import axios from 'axios';
import { reportCriticalErrorBadConf } from './Logger';

checkEnvironmentVariables();
const TIMEOUT = process.env.TIMEOUT ? parseInt(process.env.TIMEOUT) : 0;
const MAX_CONTENT_LENGTH = process.env.MAX_CONTENT_LENGTH
  ? parseInt(process.env.MAX_CONTENT_LENGTH)
  : 5000000; // 5000000 (5 * 1000 * 1000 bytes <=> 5 MB)

export const fetch = axios.create({
  timeout: TIMEOUT,
  maxContentLength: MAX_CONTENT_LENGTH,
});

function checkEnvironmentVariables() {
  if (
    process.env.TIMEOUT &&
    (isNaN(parseInt(process.env.TIMEOUT)) || parseInt(process.env.TIMEOUT) < 0)
  ) {
    const message = `Invalid environment variable TIMEOUT (value = ${process.env.TIMEOUT}): the value must be a positive number.`;
    reportCriticalErrorBadConf(message);
    throw new Error(message);
  }
  if (
    process.env.MAX_CONTENT_LENGTH &&
    (isNaN(parseInt(process.env.MAX_CONTENT_LENGTH)) ||
      parseInt(process.env.MAX_CONTENT_LENGTH) < 0)
  ) {
    const message = `Invalid environment variable MAX_CONTENT_LENGTH (value = ${process.env.MAX_CONTENT_LENGTH}): the value must be a positive number.`;
    reportCriticalErrorBadConf(message);
    throw new Error(message);
  }
}
