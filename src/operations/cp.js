import path from 'path';
import fs from 'fs';
import stream from 'stream/promises';

export async function copyFile([rawPathToFile, rawPathToDestination]) {
  const pathToFile = path.resolve(rawPathToFile);
  const { base } = path.parse(pathToFile);

  const pathToFileInNewDirectory = path.resolve(rawPathToDestination, base);

  const readableStream = fs.createReadStream(pathToFile);
  const writableStream = fs.createWriteStream(pathToFileInNewDirectory);

  await stream.pipeline(readableStream, writableStream);
}
