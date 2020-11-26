import PowerPlant from '../../src/domain/PowerPlant';

describe('Power plant', () => {
  describe('Fix missing measure', () => {
    it('When a measure is missing, we calculate a new one which power value is the average of the power of N-1 and N+1 measures.', () => {
      const m1 = { start: '1577833200', end: '1577834100', power: 1 };
      // Missing measure just after the first measure.
      const missingMeasure2 = { start: '1577834100', end: '1577835000', power: 1.5 };
      const m3 = { start: '1577835000', end: '1577835900', power: 2 };
      // Missing measure in the middle.
      const missingMeasure4 = { start: '1577835900', end: '1577836800', power: 3 };
      const m5 = { start: '1577836800', end: '1577837700', power: 4 };
      // Missing measure just before the last measure.
      const missingMeasure6 = { start: '1577837700', end: '1577838600', power: 5 };
      const m7 = { start: '1577838600', end: '1577839500', power: 6 };

      const measures = [m1, m3, m5, m7];
      const measuresOut = PowerPlant.fixMissingMeasures(measures);
      expect(measuresOut).toStrictEqual([
        m1,
        missingMeasure2,
        m3,
        missingMeasure4,
        m5,
        missingMeasure6,
        m7,
      ]);
    });
  });

  describe('Format measures on a given time step', () => {
    it('When the measures are not based on the time step, the measures are smoothed with the time step.', () => {
      const timeStepMin = 5; // 5 min = 300 sec.

      const mA1 = { start: '0', end: '300', power: 1 };
      const mA2 = { start: '300', end: '600', power: 1 };
      const mA3 = { start: '600', end: '900', power: 1 };
      const mA4 = { start: '900', end: '1200', power: 2 };
      const mA5 = { start: '1200', end: '1500', power: 2 };
      const mA6 = { start: '1500', end: '1800', power: 2 };
      const mA7 = { start: '1800', end: '2100', power: 3 };
      const mA8 = { start: '2100', end: '2400', power: 3 };
      const mA9 = { start: '2400', end: '2700', power: 3 };
      const smoothedMeasures = [mA1, mA2, mA3, mA4, mA5, mA6, mA7, mA8, mA9];

      const mB1 = { start: '0', end: '900', power: 1 };
      const mB2 = { start: '900', end: '1800', power: 2 };
      const mB3 = { start: '1800', end: '2700', power: 3 };
      const measureToSmoothed = [mB1, mB2, mB3];

      expect(PowerPlant.smoothMeasuresOnTimeStep(measureToSmoothed, timeStepMin)).toStrictEqual(
        smoothedMeasures,
      );
    });
  });
});
