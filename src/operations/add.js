import fs from 'fs/promises';
import path from 'path';

export async function createFile([fileName]) {
  const filePath = path.resolve(fileName);

  if (await isFileExist(filePath)) {
    throw new Error();
  }

  await fs.writeFile(filePath, '');
}

async function isFileExist(path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}
