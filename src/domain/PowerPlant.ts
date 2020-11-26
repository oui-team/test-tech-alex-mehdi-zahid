import { Measure } from 'domain';
import { reportCriticalError } from '../utils/Logger';
import { getNextTimeStamp } from '../utils/Time';
import DateChecker from '../utils/DateChecker';

export default abstract class PowerPlant {
  private name: string;
  private timeStep: number;

  constructor(name: string, timeStep: number) {
    this.name = name;
    this.timeStep = timeStep;
  }

  abstract getRawMeasures(startingDate: string, endingDate: string): Promise<Measure[]>;

  getName(): string {
    return this.name;
  }

  getTimeStep(): number {
    return this.timeStep;
  }

  async getMeasures(
    startingDate: string,
    endingDate: string,
    timeStep: number,
  ): Promise<Measure[]> {
    DateChecker.checkInputDates(startingDate, endingDate);
    if (timeStep <= 0) {
      throw new Error(`Invalid time step '${timeStep}': the value must be a postive number.`);
    }
    let measures: Measure[];
    try {
      const rawMeasures = await this.getRawMeasures(startingDate, endingDate);
      const fixedMeasures = PowerPlant.fixMissingMeasures(rawMeasures);
      measures = PowerPlant.smoothMeasuresOnTimeStep(fixedMeasures, timeStep);
    } catch (err) {
      reportCriticalError(`Power plant ${this.getName()}: ${err.message}`);
      throw err;
    }
    return measures;
  }

  /**
   * Fix missing measures in the raw measures given in paramters. To fix it, we
   * create a new measure with the power equal to the average of the power value
   * of n-1 and n+1 measures. We assume there is never two successive missing
   * values.
   *
   * @param {Measures[]} rawMeasures Raw measures.
   * @returns {Measures[]} Measures fixed.
   */
  static fixMissingMeasures(rawMeasures: Measure[]): Measure[] {
    const fixedMeasures: Measure[] = [];

    fixedMeasures.push(rawMeasures[0]);
    for (let i = 1; i < rawMeasures.length; ++i) {
      if (rawMeasures[i].start !== rawMeasures[i - 1].end) {
        // There is a missing value.
        const missingMeasure: Measure = {
          start: rawMeasures[i - 1].end,
          end: rawMeasures[i].start,
          power: (rawMeasures[i - 1].power + rawMeasures[i].power) / 2,
        };
        fixedMeasures.push(missingMeasure);
      }
      fixedMeasures.push(rawMeasures[i]);
    }

    return fixedMeasures;
  }

  static smoothMeasuresOnTimeStep(rawMeasures: Measure[], timeStepMin: number): Measure[] {
    const formattedMeasures: Measure[] = [];

    let currentTimestamp = parseInt(rawMeasures[0].start);
    let i = 0;
    while (i < rawMeasures.length) {
      const nextTimeStamp = getNextTimeStamp(currentTimestamp, timeStepMin);
      const rawMeasureStart = parseInt(rawMeasures[i].start);
      const rawMeasureEnd = parseInt(rawMeasures[i].end);
      if (
        (currentTimestamp >= rawMeasureStart && nextTimeStamp < rawMeasureEnd) ||
        (currentTimestamp > rawMeasureStart && nextTimeStamp < rawMeasureEnd) ||
        (currentTimestamp > rawMeasureStart && nextTimeStamp <= rawMeasureEnd)
      ) {
        const missingMeasure: Measure = {
          start: currentTimestamp.toString(),
          end: nextTimeStamp.toString(),
          power: rawMeasures[i].power,
        };
        formattedMeasures.push(missingMeasure);
        currentTimestamp = nextTimeStamp;
        if (nextTimeStamp >= rawMeasureEnd) {
          ++i;
        }
      } else {
        formattedMeasures.push(rawMeasures[i]);
        currentTimestamp = parseInt(rawMeasures[i].start);
        ++i;
      }
    }

    return formattedMeasures;
  }
}
