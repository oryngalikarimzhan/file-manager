import fs from 'fs/promises';
import path from 'path';

export async function renameFile([rawPathToFile, newFileName]) {
  const pathToFile = path.resolve(rawPathToFile);

  const { dir } = path.parse(pathToFile);
  const newFilePath = path.join(dir, newFileName);

  await fs.rename(pathToFile, newFilePath);
}
