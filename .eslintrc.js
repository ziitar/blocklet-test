module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: '@arcblock/eslint-config',
  env: {
    es6: true,
    browser: true,
    node: true,
    mocha: true,
    jest: true,
  },
  globals: {
    logger: true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'no-restricted-globals': 0,
    'no-shadow': 'off',
    'no-console': 'off',
  },
};
