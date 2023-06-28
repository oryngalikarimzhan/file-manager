import { homedir } from 'os';
import readline from 'readline';

import { buildPrompt } from './helpers/buildPrompt.js';
import { defineUser } from './helpers/defineUser.js';
import { UNKNOWN_OPERATION_MESSAGE, OPERATION_ERROR_MESSAGE } from './helpers/constants.js';
import { writeOKMessage, writeErrorMessage, writeGreetingMessage, writeGoodbyeMessage } from './helpers/message.js';
import * as operation from './operations/index.js';

export class FileManager {
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  user = defineUser();

  operations = {
    cat: {
      operationFn: operation.readFile,
      parameters: 1,
    },
    add: {
      operationFn: operation.createFile,
      parameters: 1,
    },
    rn: {
      operationFn: operation.renameFile,
      parameters: 2,
    },
    cp: {
      operationFn: operation.copyFile,
      parameters: 2,
    },
    mv: {
      operationFn: operation.moveFile,
      parameters: 2,
    },
    rm: {
      operationFn: operation.removeFile,
      parameters: 1,
    },
    hash: {
      operationFn: operation.showFileHash,
      parameters: 1,
    },
    compress: {
      operationFn: operation.compress,
      parameters: 2,
    },
    decompress: {
      operationFn: operation.decompress,
      parameters: 2,
    },
    cd: {
      operationFn: operation.changeDir,
      parameters: 1,
    },
    ls: {
      operationFn: operation.showDirList,
    },
    up: {
      operationFn: operation.goUpperPath,
    },
    os: {
      operationFn: operation.showOSInfo,
      parameters: 'chain',
      options: ['--eol', '--cpus', '--homedir', '--username', '--architecture'],
    },
  };

  init() {
    writeGreetingMessage(this.user);
    process.chdir(homedir());
    this.updatePrompt(this.rl);

    this.rl
      .on('close', () => {
        writeGoodbyeMessage(this.user);
      })
      .on('line', (line) => {
        if (line.trim() === '.exit') {
          this.rl.close();
          process.exit();
        }
      });

    this.configureOperations();
  }

  updatePrompt() {
    this.rl.setPrompt(buildPrompt());
    this.rl.prompt(true);
  }

  configureOperations() {
    this.rl.on('line', async (rawLine) => {
      const line = rawLine.trim().toLowerCase();

      if (!line.trim().length) {
        this.updatePrompt(this.rl);
        return;
      }

      const [command, ...args] = line.split(' ');

      try {
        this.validateConsoleInput(command, args);

        const { operationFn } = this.operations[command];
        try {
          args.length === 0 ? await operationFn() : await operationFn(args);
          writeOKMessage();
        } catch {
          writeErrorMessage(OPERATION_ERROR_MESSAGE);
        }
      } catch {
        writeErrorMessage(UNKNOWN_OPERATION_MESSAGE);
      }

      this.updatePrompt(this.rl);
    });
  }

  validateConsoleInput(command, args) {
    const { parameters, options } = this.operations[command];

    if (!parameters && args.length === 0) {
      return;
    }

    if (!parameters && args.length !== 0) {
      throw new Error();
    }

    if (parameters && args.length === 0) {
      throw new Error();
    }

    if (parameters === 'chain') {
      const argsSet = new Set(args);

      if (argsSet.size !== args.length) {
        throw new Error();
      }

      if (!args.every((arg) => options.includes(arg))) {
        throw new Error();
      }
    }

    if (typeof parameters === 'number' && parameters !== args.length) {
      throw new Error();
    }
  }
}
