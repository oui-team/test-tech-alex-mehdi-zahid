import logger, { reportCriticalError, reportCriticalErrorBadConf } from './Logger';
import { Measure } from 'domain';

const JSON_FORMAT = 'json';
const CSV_FORMAT = 'csv';
export const SUPPORTED_FORMATS = [JSON_FORMAT, CSV_FORMAT];

export default class OutputWritter {
  static getErrorMessageInvalidFormat(format: string): string {
    return `The output format '${format}' is not supported. Supported formats: ${SUPPORTED_FORMATS.join(
      ', ',
    )}.`;
  }

  static checkFormatParameter(format: string): void {
    if (!~SUPPORTED_FORMATS.indexOf(format.toLowerCase())) {
      throw new Error(OutputWritter.getErrorMessageInvalidFormat(format));
    }
  }

  static writeOutput(measures: Measure[], format: string): void {
    try {
      OutputWritter.checkFormatParameter(format);
    } catch (err) {
      reportCriticalError(err.message);
      return;
    }

    let output;
    switch (format.toLowerCase()) {
      case JSON_FORMAT:
        output = OutputWritter.formatToJSON(measures);
        break;
      case CSV_FORMAT:
        output = OutputWritter.formatToCSV(measures);
        break;
      default:
        throw new Error(OutputWritter.getErrorMessageInvalidFormat(format));
    }

    OutputWritter.writeIntoConsole(output, format.toLowerCase());
  }

  static formatToJSON(measure: Measure[]): string {
    return JSON.stringify(measure, null, 2);
  }

  static formatToCSV(measures: Measure[]): string {
    let output = 'start,end,value';
    measures.forEach((measure) => {
      output += `\n${measure.start},${measure.end},${measure.power}`;
    });
    return output;
  }

  static writeIntoConsole(output: string, format: string): void {
    logger.info(`Total power in ${format} format:\n` + output);
  }
}

function checkEnvironmentVariables() {
  if (process.env.OUTPUT_FORMAT) {
    try {
      OutputWritter.checkFormatParameter(process.env.OUTPUT_FORMAT);
    } catch (err) {
      const message = `Invalid environment variable OUTPUT_FORMAT (value = ${process.env.OUTPUT_FORMAT}): ${err.message}`;
      reportCriticalErrorBadConf(message);
      throw new Error(message);
    }
  }
}

checkEnvironmentVariables();
export const DEFAULT_OUTPUT_FORMAT = process.env.OUTPUT_FORMAT ? process.env.OUTPUT_FORMAT : 'json';
