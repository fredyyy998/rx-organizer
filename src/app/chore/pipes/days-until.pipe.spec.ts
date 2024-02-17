import { DaysUntilPipe } from './days-until.pipe';

describe('DaysUntilPipe', () => {
  it('create an instance', () => {
    const pipe = new DaysUntilPipe();
    expect(pipe).toBeTruthy();
  });

  it('should convert date to days until date', () => {
    const pipe = new DaysUntilPipe();
    const days = 10;
    const testDate = new Date();
    testDate.setDate(testDate.getDate() + days);

    const result = pipe.transform(testDate);

    expect(result).toBe(days);
  });
});
