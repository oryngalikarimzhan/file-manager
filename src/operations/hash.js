import fs from 'fs';
import crypto from 'crypto';
import stream from 'stream/promises';
import { Writable } from 'stream';
import path from 'path';

export async function showFileHash([rawPathToFile]) {
  const pathToFile = path.resolve(rawPathToFile);

  const readableStream = fs.createReadStream(pathToFile);
  const hash = crypto.createHash('sha256').setEncoding('hex');

  const writableStream = new Writable({
    write(chunk, _, next) {
      console.log(chunk.toString());
      next();
    },
  });

  await stream.pipeline(readableStream, hash, writableStream);
}
