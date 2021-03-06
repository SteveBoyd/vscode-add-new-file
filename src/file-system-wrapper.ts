import * as fs from 'fs';

export function writeToFile(path: string, content: string): void {
  const data = new Uint8Array(Buffer.from(content));
  fs.writeFileSync(path, data, {});
}

export function createDirectory(path: string): void {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
}

export function readJsonFile(path: string): string | null {
  try {
    if (fs.existsSync(path)) {
      return JSON.parse(fs.readFileSync(path, 'utf8'));
    }
  } catch (e) {
    console.error(e);
  }

  return null;
}

export function copyFile(
  source: string,
  destination: string,
  overwrite: boolean
): void {
  if (!fs.existsSync(source)) {
    return;
  }

  if (fs.existsSync(destination)) {
    if (!overwrite) {
      return;
    }

    fs.unlinkSync(destination);
  }

  fs.copyFileSync(source, destination);
}

export function deleteFile(path: string): void {
  if (path && fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
}

export function fileExists(path: string): boolean {
  return fs.existsSync(path);
}
