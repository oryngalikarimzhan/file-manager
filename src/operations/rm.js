import fs from 'fs/promises';
import path from 'path';

export async function removeFile([rawPathToFile]) {
  await fs.unlink(path.resolve(rawPathToFile));
}
