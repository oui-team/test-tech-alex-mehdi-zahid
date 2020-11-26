import { Measure } from 'domain';
import PowerPlant from './PowerPlant';
import { reportCriticalErrorBadConf } from '../utils/Logger';
import { fetch } from '../utils/Network';

export default class PowerPlantHounslow extends PowerPlant {
  constructor() {
    super(POWER_PLANT_HOUNSLOW_NAME, POWER_PLANT_HOUNSLOW_TIME_STEP);
  }

  async getRawMeasures(staringDate: string, endingDate: string): Promise<Measure[]> {
    const response = await fetch.request<string>({
      url: POWER_PLANT_HOUNSLOW_API_URL,
      params: {
        from: staringDate,
        to: endingDate,
      },
    });

    return PowerPlantHounslow.transformHounslowMeasureToMeasure(response.data);
  }

  static transformHounslowMeasureToMeasure(hounslowMeasures: string): Measure[] {
    const measures: Measure[] = [];
    const rows = hounslowMeasures.split('\n');
    rows.forEach((row, index) => {
      // The first line is the header. We skip it.
      if (index !== 0) {
        const field = row.split(',');
        measures.push({
          start: field[0],
          end: field[1],
          power: parseInt(field[2]),
        });
      }
    });

    return measures;
  }
}

function checkEnvironmentVariables() {
  if (!process.env.POWER_PLANT_HOUNSLOW_NAME) {
    const message = `Invalid environment variable POWER_PLANT_HOUNSLOW_NAME: value required.`;
    reportCriticalErrorBadConf(message);
    throw new Error(message);
  }
  if (!process.env.POWER_PLANT_HOUNSLOW_API_URL) {
    const message = `Invalid environment variable POWER_PLANT_HOUNSLOW_API_URL: value required.`;
    reportCriticalErrorBadConf(message);
    throw new Error(message);
  }
  if (!process.env.POWER_PLANT_HOUNSLOW_TIME_STEP) {
    const message = `Invalid environment variable POWER_PLANT_HOUNSLOW_TIME_STEP: value required.`;
    reportCriticalErrorBadConf(message);
    throw new Error(message);
  }
  if (
    isNaN(parseInt(process.env.POWER_PLANT_HOUNSLOW_TIME_STEP)) ||
    parseInt(process.env.POWER_PLANT_HOUNSLOW_TIME_STEP) < 0
  ) {
    const message = `Invalid environment variable POWER_PLANT_BARNSLEY_TIME_STEP (value = '${process.env.POWER_PLANT_HOUNSLOW_TIME_STEP}'): the value must be a postive number.`;
    reportCriticalErrorBadConf(message);
    throw new Error(message);
  }
}

checkEnvironmentVariables();
const POWER_PLANT_HOUNSLOW_NAME = process.env.POWER_PLANT_HOUNSLOW_NAME
  ? process.env.POWER_PLANT_HOUNSLOW_NAME
  : '';
const POWER_PLANT_HOUNSLOW_API_URL = process.env.POWER_PLANT_HOUNSLOW_API_URL
  ? process.env.POWER_PLANT_HOUNSLOW_API_URL
  : '';
const POWER_PLANT_HOUNSLOW_TIME_STEP = process.env.POWER_PLANT_HOUNSLOW_TIME_STEP
  ? parseInt(process.env.POWER_PLANT_HOUNSLOW_TIME_STEP)
  : 0;
