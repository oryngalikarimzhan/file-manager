import fs from 'fs';
import stream from 'stream/promises';
import path from 'path';
import zlib from 'zlib';

export async function compress([rawPathToFile, rawPathToDestination]) {
  const pathToFile = path.resolve(rawPathToFile);
  const { base } = path.parse(pathToFile);

  const pathToDestination = path.resolve(rawPathToDestination, `${base}.br`);

  const readableStream = fs.createReadStream(pathToFile);
  const writableStream = fs.createWriteStream(pathToDestination);
  const compressor = zlib.createBrotliCompress();

  await stream.pipeline(readableStream, compressor, writableStream);
}
