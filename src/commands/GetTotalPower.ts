import groupBy from 'lodash.groupby';
import { Measure } from 'domain';
import { reportCriticalError, reportCriticalErrorBadConf } from '../utils/Logger';
import DateChecker from '../utils/DateChecker';
import OutputWritter from '../utils/OutputWritter';
import PowerPlant from '../domain/PowerPlant';
import PowerPlantBarnsley from '../domain/PowerPlantBarnsley';
import PowerPlantHawes from '../domain/PowerPlantHawes';
import PowerPlantHounslow from '../domain/PowerPlantHounslow';

export const CMD_GET_TOTAL_POWER = 'get-total-power';
export const CMD_GET_TOTAL_POWER_EXAMPLE = `${CMD_GET_TOTAL_POWER} --from 01-01-2020 --to 02-01-2020 --format json`;

export default class GetTotalPower {
  static async run(startingDate: string, endingDate: string, format: string): Promise<void> {
    try {
      DateChecker.checkInputDates(startingDate, endingDate);
    } catch (err) {
      reportCriticalError(err.message);
      return;
    }

    // If we need to add a new power plant:
    // 1. Add a new class which inherits from PowerPlant.
    // 2. Add its corresponding environment variable in the .env.example Only
    //    the time step and the name are required by the PowerPlant class.
    // 3. Instantiate it here. The generic algorithm will take care of
    //    aggregating the data from all the power plants.
    const powerPlants: PowerPlant[] = [
      new PowerPlantHawes(),
      new PowerPlantBarnsley(),
      new PowerPlantHounslow(),
    ];

    try {
      const measures = await this.aggregateTotalPower(startingDate, endingDate, powerPlants);
      OutputWritter.writeOutput(measures, format);
    } catch (err) {
      // The error must have been already logged.
    }
  }

  static async aggregateTotalPower(
    startingDate: string,
    endingDate: string,
    powerPlants: PowerPlant[],
  ): Promise<Measure[]> {
    const minTimeStep = GetTotalPower.getMinTimeStep(powerPlants);

    const allMeasures: Array<Promise<Measure[]>> = [];
    powerPlants.forEach((powerPlant) => {
      allMeasures.push(powerPlant.getMeasures(startingDate, endingDate, minTimeStep));
    });

    return Promise.all(allMeasures)
      .then((allMeasuresFetched) => {
        this.checkAllMeasuresHaveSameSize(powerPlants, allMeasuresFetched);
        return this.aggregateMeasuresByPower(allMeasuresFetched.flat());
      })
      .catch((err) => {
        throw Error(err);
      });
  }

  static getMinTimeStep(powerPlants: PowerPlant[]): number {
    const timeSteps: number[] = [];
    powerPlants.forEach((powerPlant) => {
      timeSteps.push(powerPlant.getTimeStep());
    });
    const minTimeStep = Math.min(...timeSteps);
    if (isNaN(minTimeStep)) {
      const message = `${CMD_GET_TOTAL_POWER}: Impossible to get the minimum time step. One of the power plant time step provided is not a number.`;
      reportCriticalErrorBadConf(message);
      throw new Error(message);
    }
    return minTimeStep;
  }

  static checkAllMeasuresHaveSameSize(powerPlants: PowerPlant[], allMeasures: Measure[][]): void {
    const measureSizeReducer = (accumulator: number, measures: Measure[]) =>
      accumulator + measures.length;
    if (
      !(allMeasures.reduce(measureSizeReducer, 0) / allMeasures.length === allMeasures[0].length)
    ) {
      let message = `Impossible to aggregate the measures: the number of measures returned by the power plants or smooth after correction are not the sames:\n`;
      allMeasures.forEach((powerPlantMeasures, powerPlantIndex) => {
        message += `${powerPlants[powerPlantIndex].getName()} number of measures = ${
          powerPlantMeasures.length
        }\n`;
      });
      throw new Error(message);
    }
  }

  static aggregateMeasuresByPower(measures: Measure[]): Measure[] {
    const measuresGroupedByBoundsObj = groupBy(measures, (measure: Measure) => {
      return measure.start + '-' + measure.end;
    });
    const measuresGroupedByBoundsArr: Measure[][] = Object.values(measuresGroupedByBoundsObj);

    const powerReducer = (powerAccumulator: number, measure: Measure) => {
      return powerAccumulator + measure.power;
    };

    const aggregatedMeasuresByPower: Measure[] = [];
    measuresGroupedByBoundsArr.forEach((measuresGroup) => {
      aggregatedMeasuresByPower.push({
        start: measuresGroup[0].start,
        end: measuresGroup[0].end,
        power: measuresGroup.reduce(powerReducer, 0),
      });
    });

    return aggregatedMeasuresByPower.sort((m1: Measure, m2: Measure) => {
      if (parseInt(m1.start) < parseInt(m2.start)) {
        return -1;
      } else if (parseInt(m1.start) > parseInt(m2.start)) {
        return 1;
      }
      return 0;
    });
  }
}
