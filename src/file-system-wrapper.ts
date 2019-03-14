import * as fs from 'fs';

export class FileSystemWrapper {
  writeToFile(path: string, content: string): void {
    const data = new Uint8Array(Buffer.from(content));
    fs.writeFileSync(path, data, {});
  }

  createDirectory(path: string): void {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  }
}
