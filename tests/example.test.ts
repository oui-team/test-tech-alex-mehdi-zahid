/* eslint-disable jest/no-commented-out-tests */
// Note: here is an example of how we can structure the tests:
// // 1. Unit under test: "Products Service"
// describe('Products Service', function() {
//  // 2. Action: "Add new product"
//  describe('Add new product', function() {
//     // 3. Scenario: "When no price is specified,""
//     // 4. Expectation: "then the product status is pending approval"
//     it('When no price is specified, then the product status is pending approval', ()=> {
//       const newProduct = new ProductService().add(...);
//       expect(newProduct.status).to.equal('pendingApproval');
//     });
//   });
// });

describe('Example of a test file', () => {
  describe('Load of the .env.test file in the testing environment.', () => {
    it('The default value of .env.test should be available in the tests.', () => {
      expect(process.env.NODE_ENV).toBe('test');

      expect(process.env.MIN_DATE).toBe('01-01-1970');
      expect(process.env.MAX_DATE).toBe('01-01-2020');

      expect(process.env.POWER_PLANT_HAWES_NAME).toBe('Hawes');
      expect(process.env.POWER_PLANT_HAWES_TIME_STEP).toBe('15');
      expect(process.env.POWER_PLANT_HAWES_API_URL).toBe(
        'https://interview.beta.bcmenergy.fr/hawes',
      );

      expect(process.env.POWER_PLANT_BARNSLEY_NAME).toBe('Barnsley');
      expect(process.env.POWER_PLANT_BARNSLEY_TIME_STEP).toBe('30');
      expect(process.env.POWER_PLANT_BARNSLEY_API_URL).toBe(
        'https://interview.beta.bcmenergy.fr/barnsley',
      );

      expect(process.env.POWER_PLANT_HOUNSLOW_NAME).toBe('Hounslow');
      expect(process.env.POWER_PLANT_HOUNSLOW_TIME_STEP).toBe('60');
      expect(process.env.POWER_PLANT_HOUNSLOW_API_URL).toBe(
        'https://interview.beta.bcmenergy.fr/hounslow',
      );

      expect(process.env.OUTPUT_FORMAT).toBe('json');

      expect(process.env.LOGS_DIR).toBe('./logs');

      expect(process.env.TIMEOUT).toBe('0');
      expect(process.env.MAX_CONTENT_LENGTH).toBe('5000000');
    });
  });
});
