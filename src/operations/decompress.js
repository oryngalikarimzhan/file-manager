import fs from 'fs';
import stream from 'stream/promises';
import path from 'path';
import zlib from 'zlib';

export async function decompress([rawPathToFile, rawPathToDestination]) {
  const pathToFile = path.resolve(rawPathToFile);
  const { name, ext } = path.parse(pathToFile);

  const pathToDestination = path.resolve(rawPathToDestination, name);

  if (ext !== '.br') {
    throw new Error();
  }

  const readableStream = fs.createReadStream(pathToFile);
  const writableStream = fs.createWriteStream(pathToDestination);
  const decompressor = zlib.createBrotliDecompress();

  await stream.pipeline(readableStream, decompressor, writableStream);
}
