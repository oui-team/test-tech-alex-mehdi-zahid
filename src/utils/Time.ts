import moment from 'moment';

export function getNextTimeStamp(startTimestampSec: number, timeStepMin: number): number {
  return moment.unix(startTimestampSec).add(moment.duration(timeStepMin, 'minutes')).unix();
}
