import GetTotalPower from '../../src/commands/GetTotalPower';

describe('GetTotalPower command', () => {
  it('Should aggregate measures by power.', () => {
    const mA1 = { start: '0', end: '1', power: 1 };
    const mA2 = { start: '1', end: '2', power: 2 };
    const mA3 = { start: '2', end: '3', power: 1 };
    const mA4 = { start: '3', end: '4', power: 1 };
    const mA5 = { start: '4', end: '5', power: 1 };

    const mB1 = { start: '0', end: '1', power: 1 };
    const mB2 = { start: '1', end: '2', power: 2 };
    const mB3 = { start: '2', end: '3', power: 1 };
    const mB4 = { start: '3', end: '4', power: 1 };
    const mB5 = { start: '4', end: '5', power: 1 };

    const mC1 = { start: '0', end: '1', power: 1 };
    const mC2 = { start: '1', end: '2', power: 2 };
    const mC3 = { start: '2', end: '3', power: 1 };
    const mC4 = { start: '3', end: '4', power: 3 };
    const mC5 = { start: '4', end: '5', power: 1 };

    const powerPlantA = [mA1, mA2, mA3, mA4, mA5];
    const powerPlantB = [mB1, mB2, mB3, mB4, mB5];
    const powerPlantC = [mC1, mC2, mC3, mC4, mC5];
    const allMeasureMixed = [...powerPlantA, ...powerPlantB, ...powerPlantC];

    const exepectedOutput = [
      { start: '0', end: '1', power: 3 },
      { start: '1', end: '2', power: 6 },
      { start: '2', end: '3', power: 3 },
      { start: '3', end: '4', power: 5 },
      { start: '4', end: '5', power: 3 },
    ];

    expect(GetTotalPower.aggregateMeasuresByPower(allMeasureMixed)).toStrictEqual(exepectedOutput);
  });
});
