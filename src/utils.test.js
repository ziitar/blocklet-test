import utils from './utils';

describe('test utils ', () => {
  // test isFalseWithoutZore
  it('isFalseWithoutZore(false) returen true', () => {
    expect(utils.isFalseWithoutZore(false)).toBe(true);
  });
  it('isFalseWithoutZore(undefined) returen false', () => {
    expect(utils.isFalseWithoutZore(undefined)).toBe(true);
  });
  it('isFalseWithoutZore("") returen false', () => {
    expect(utils.isFalseWithoutZore('')).toBe(true);
  });
  it('isFalseWithoutZore(null) returen false', () => {
    expect(utils.isFalseWithoutZore(null)).toBe(true);
  });
  it('isFalseWithoutZore(number("fesfsx")) returen false', () => {
    expect(utils.isFalseWithoutZore(Number('fesfsx'))).toBe(true);
  });
  it('isFalseWithoutZore(0) returen false', () => {
    expect(utils.isFalseWithoutZore(0)).toBe(false);
  });
  it('isFalseWithoutZore(-0) returen false', () => {
    expect(utils.isFalseWithoutZore(-0)).toBe(false);
  });
  it('isFalseWithoutZore(true) returen false', () => {
    expect(utils.isFalseWithoutZore(true)).toBe(false);
  });
  it('isFalseWithoutZore(1) returen false', () => {
    expect(utils.isFalseWithoutZore(1)).toBe(false);
  });
  it('isFalseWithoutZore("1") returen false', () => {
    expect(utils.isFalseWithoutZore('1')).toBe(false);
  });
  it('isFalseWithoutZore({}) returen false', () => {
    expect(utils.isFalseWithoutZore({})).toBe(false);
  });

  // test dateFormat
  it('dateFormat returen right', () => {
    const date = new Date();
    const timestamp = Math.floor(date.getTime() / 1000);
    expect(utils.dateFormat(timestamp)).toBe(
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
    );
  });
  it('dateFormat Invalid Date', () => {
    expect(utils.dateFormat('timestamp')).toBe('NaN-NaN-NaN NaN:NaN');
  });

  // test numberFormat
  it('numberFormat(1234567890) return 1,234,567,890', () => {
    expect(utils.numberFormat(1234567890)).toBe('1,234,567,890');
  });
  it('numberFormat(1234567890.123456) return 1,234,567,890.123456', () => {
    expect(utils.numberFormat(1234567890.123456)).toBe('1,234,567,890.123456');
  });
  it('numberFormat("1234567890.123456") return 1,234,567,890.123456', () => {
    expect(utils.numberFormat('1234567890.123456')).toBe('1,234,567,890.123456');
  });
  it('numberFormat("abcdefg")', () => {
    expect(utils.numberFormat('abcdefg')).toBe('abcdefg');
  });

  // test feeFormat
  it('feeFormat(1234567890) return 12.34567890', () => {
    expect(utils.feeFormat(1234567890)).toBe('12.34567890');
  });
  it('feeFormat(1234567890.123456) return 1,234,567,890.123456', () => {
    expect(utils.feeFormat(1234567890.123456)).toBe('12.34567890');
  });
  it('feeFormat("1234567890.123456") return 1,234,567,890.123456', () => {
    expect(utils.feeFormat('1234567890.123456')).toBe('12.34567890');
  });
  it('feeFormat("abcdefg")', () => {
    expect(utils.feeFormat('abcdefg')).toBe('NaN');
  });
});
