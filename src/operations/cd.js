import path from 'path';

export function changeDir([rawPath]) {
  const pathToDir = path.resolve(rawPath);

  process.chdir(pathToDir);
}
