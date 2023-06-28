import { constructColorTextSequence } from './writeColorText.js';
import { colors } from './constants.js';

export function buildPrompt() {
  const now = new Date();
  const time = now.toLocaleTimeString();
  const date = now.toLocaleDateString();

  const datePrompt = constructColorTextSequence(` ${date}-${time} `, colors.datePrompt);
  const cwdPrompt = constructColorTextSequence(` ~${process.cwd()} `, colors.cwdPrompt);
  const promptPostfix = constructColorTextSequence(': ', colors.promptPostfix);

  return `${datePrompt}${cwdPrompt}${promptPostfix}`;
}
