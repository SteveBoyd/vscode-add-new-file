import * as fs from 'fs';
import mkdirp = require('mkdirp');

export class FileSystemWrapper {
  writeToFile(path: string, content: string): void {
    const data = new Uint8Array(Buffer.from(content));
    fs.writeFileSync(path, data, {});
  }

  createDirectory(path: string): void {
    mkdirp(path, (error: any) => {
      if (error) {
        console.error(error);
      }
    });
  }
}
