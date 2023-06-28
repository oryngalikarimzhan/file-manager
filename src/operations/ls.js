import { readdir } from 'fs/promises';

export async function showDirList() {
  const list = await readdir(process.cwd());
  console.log('Current directory list:');
  console.table(list);
}
