export default {
  /**
   * 判定是否为非0的假值
   * @param {any} v
   * @returns
   */
  isFalseWithoutZore: (v) => {
    return !v && (typeof v === 'undefined' || v === '' || v === null || Number.isNaN(v) || v === false);
  },
  /**
   *根据10位数的时间搓生成 指定格式的时间表达式
   * @param {string|number} timestamp
   * @returns
   */
  dateFormat: (timestamp) => {
    const date = new Date(Number(`${timestamp}000`));
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  },
  /**
   * 按三位数字使用逗号分隔，金钱表示法
   * @param {number|string} number
   * @returns
   */
  numberFormat: (number) => {
    return `${number}`.replace(
      /^(\d+)(\.\d+)?$/,
      (match, $1, $2) => `${$1.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${$2 || ''}`
    );
  },
  /**
   * BTC单位格式化
   * @param {number} number
   * @returns
   */
  feeFormat: (number) => {
    return (number / 100000000).toFixed(8);
  },
};
