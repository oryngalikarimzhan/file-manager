import { writeColorText } from './writeColorText.js';
import { colors } from './constants.js';

export function writeErrorMessage(text) {
  writeColorText({ text: ` ${text} `, colorCode: colors.errorMessage, postfix: '\n\n' });
}

export function writeOKMessage() {
  writeColorText({ text: ` OK `, postfix: '\n\n' });
}

export function writeGreetingMessage(user) {
  writeColorText({
    text: ` Welcome to the File Manager, ${user} `,
    colorCode: colors.specialMessage,
    postfix: '\n\n',
  });
}

export function writeGoodbyeMessage(user) {
  writeColorText({
    text: ` Thank you for using File Manager, ${user}, goodbye! `,
    colorCode: colors.specialMessage,
    postfix: '\n\n',
    prefix: '\n',
  });
}
