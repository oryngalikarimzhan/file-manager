import path from 'path';

export function resolvePath(filePath) {
  return path.isAbsolute(filePath) ? path.resolve(filePath) : filePath;
}
