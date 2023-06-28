import path from 'path';
import fs from 'fs';
import { Writable } from 'stream';
import { pipeline } from 'stream/promises';

export async function readFile([rawPathToFile]) {
  const pathToFile = path.resolve(rawPathToFile);
  const readableStream = fs.createReadStream(pathToFile);
  const writableStream = new Writable({
    write(chunk, _, next) {
      console.log(chunk.toString());
      next();
    },
  });
  await pipeline(readableStream, writableStream);
}
