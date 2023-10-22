const path = require('path');

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`;

module.exports = {
  '*.{ts,js}': [buildEslintCommand, 'prettier --write'],
};
