import { unlink } from 'fs/promises';

import { copyFile } from './cp.js';

export async function moveFile([rawPathToFile, rawPathToDestination]) {
  await copyFile([rawPathToFile, rawPathToDestination]);
  await unlink(rawPathToFile);
}
