import moment from 'moment';
import { reportCriticalErrorBadConf } from './Logger';

export const DATE_FORMAT = 'MM-DD-YYYY';

const DEFAULT_STARTING_DATE = '01-01-1970';
const PREFIX_STARTING_DATE = 'The starting date';
const PREFIX_ENDING_DATE = 'The ending date';

export default class DateChecker {
  static checkInputDates(startingDate: string, endingDate: string): void {
    DateChecker.checkStartingDate(startingDate);
    DateChecker.checkEndingDate(endingDate);
    DateChecker.checkStartingDateIsBeforeEndingDate(startingDate, endingDate);
  }

  static checkStartingDate(startingDate: string): void {
    DateChecker.checkDateFormat(startingDate, PREFIX_STARTING_DATE);
    if (moment(startingDate, DATE_FORMAT).isBefore(moment(MIN_DATE, DATE_FORMAT))) {
      throw new Error(
        `Invalid starting date '${startingDate}'. The minimum starting date is '${MIN_DATE}'.`,
      );
    }
  }

  static checkEndingDate(endingDate: string): void {
    DateChecker.checkDateFormat(endingDate, PREFIX_ENDING_DATE);
    if (moment(endingDate, DATE_FORMAT).isAfter(moment(MAX_DATE, DATE_FORMAT))) {
      throw new Error(
        `Invalid ending date '${endingDate}'. The maximum ending date is '${MAX_DATE}'`,
      );
    }
  }

  static checkStartingDateIsBeforeEndingDate(startingDate: string, endingDate: string): void {
    DateChecker.checkDateFormat(startingDate, PREFIX_STARTING_DATE);
    DateChecker.checkDateFormat(endingDate, PREFIX_ENDING_DATE);
    if (moment(startingDate, DATE_FORMAT).isAfter(moment(endingDate, DATE_FORMAT))) {
      throw new Error(
        `The starting date '${startingDate}' must be before the ending date '${endingDate}'.`,
      );
    }
  }

  static checkDateFormat(date: string, prefixMessage = 'The date'): void {
    if (!moment(date, DATE_FORMAT, true).isValid()) {
      throw new Error(
        `${prefixMessage} '${date}' is in an invalid format. The format must be ${DATE_FORMAT}.`,
      );
    }
  }
}

function checkEnvironmentVariables() {
  if (process.env.MIN_DATE) {
    try {
      DateChecker.checkDateFormat(process.env.MIN_DATE);
    } catch (err) {
      const message = `Invalid environment variable MIN_DATE (value = ${process.env.MIN_DATE}): ${err.message}`;
      reportCriticalErrorBadConf(message);
      throw new Error(message);
    }
  }
  if (process.env.MAX_DATE) {
    try {
      DateChecker.checkDateFormat(process.env.MAX_DATE);
    } catch (err) {
      const message = `Invalid environment variable MAX_DATE (value = ${process.env.MAX_DATE}): ${err.message}`;
      reportCriticalErrorBadConf(message);
      throw new Error(message);
    }
  }
  if (process.env.MIN_DATE && process.env.MAX_DATE) {
    try {
      DateChecker.checkStartingDateIsBeforeEndingDate(process.env.MIN_DATE, process.env.MAX_DATE);
    } catch (err) {
      const message = `Invalid environment variables MIN_DATE (value = ${process.env.MIN_DATE}) and MAX_DATE (value = ${process.env.MAX_DATE}): ${err.message}`;
      reportCriticalErrorBadConf(message);
      throw new Error(message);
    }
  }
}

checkEnvironmentVariables();
const MIN_DATE = process.env.MIN_DATE ? process.env.MIN_DATE : DEFAULT_STARTING_DATE;
const MAX_DATE = process.env.MAX_DATE ? process.env.MAX_DATE : moment().format(DATE_FORMAT);
