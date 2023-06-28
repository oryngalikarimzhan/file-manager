import { colors } from './constants.js';

export function constructColorTextSequence(text, colorCode) {
  return `\x1b[${colorCode}m${text}\x1b[0m`;
}

export function writeColorText({ text, colorCode = colors.defaultMessage, prefix = '', postfix = '' }) {
  process.stdout.write(prefix);
  process.stdout.write(constructColorTextSequence(text, colorCode));
  process.stdout.write(postfix);
}
