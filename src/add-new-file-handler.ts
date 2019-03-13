import * as vscode from 'vscode';

import { FileSystemWrapper } from './file-system-wrapper';
import { StringHelpers } from './helpers/string-helpers';

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
            const fileSystem = new FileSystemWrapper();
            const stringHelpers = new StringHelpers();

            const normalizedResult = stringHelpers.replaceAll(
              result,
              '/',
              '\\'
            );

            console.log(normalizedResult);
            if (normalizedResult.endsWith('\\')) {
              fileSystem.createDirectory(normalizedResult);
            } else {
              fileSystem.writeToFile(normalizedResult, 'foo');
            }
          }
        }
      );
  }
}
