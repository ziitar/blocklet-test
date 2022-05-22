export default {
  isFalseWithoutZore: (v) => {
    return typeof v === 'undefined' || v === '' || v === null || Number.isNaN(v);
  },
  dateFormat: (timestamp) => {
    const date = new Date(Number(`${timestamp}000`));
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  },
  numberFormat: (number) => {
    return `${number}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  feeFormat: (number) => {
    return (number / 100000000).toFixed(8);
  },
};
