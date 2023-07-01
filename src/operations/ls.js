import { readdir } from 'fs/promises';

export async function showList() {
  const list = await readdir(process.cwd(), { withFileTypes: true });

  const sortedList = list
    .reduce(
      ([acc], f) => {
        if (f.isDirectory()) {
          acc[0].push({ ...f, type: 'directory' });
        } else {
          acc[1].push({ ...f, type: 'file' });
        }
        return acc;
      },
      [[], []]
    )
    .map((l) => l.sort((f) => f.name))
    .flatMap((s) => s);

  console.log('Current directory list:');
  console.table(sortedList);
}
