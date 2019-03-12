import * as vscode from 'vscode';

import { FileSystemWrapper } from './file-system-wrapper';

export class AddNewFileHandler {
  public addNewFile() {
    const rootPath: string = vscode.workspace.rootPath || '';
    const rootPathLength: number = rootPath.length;
    vscode.window
      .showInputBox({
        value: rootPath,
        valueSelection: [rootPathLength, rootPathLength]
      })
      .then(
        (result: string | undefined): void => {
          if (result) {
            const normalizedResult = result.replace('\\', '/');
            const fileSystem = new FileSystemWrapper();

            if (normalizedResult.endsWith('/')) {
              fileSystem.createDirectory(normalizedResult);
            } else {
              fileSystem.writeToFile(normalizedResult, 'foo');
            }
          }
        }
      );
  }
}
