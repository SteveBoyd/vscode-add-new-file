import * as vscode from 'vscode';

import { FileSystemWrapper } from './file-system-wrapper';
import { StringHelpers } from './helpers/string-helpers';

const fileSystem: FileSystemWrapper = new FileSystemWrapper();
const stringHelpers: StringHelpers = new StringHelpers();

export function addNewFile() {
  const rootPath: string = vscode.workspace.rootPath || '';
  const rootPathLength: number = rootPath.length;

  try {
    vscode.window
      .showInputBox({
        value: rootPath,
        valueSelection: [rootPathLength, rootPathLength]
      })
      .then(processUserInput);
  } catch (exception) {
    console.error(exception);
  }
}

function processUserInput(userInput: string | undefined): void {
  if (userInput) {
    const normalizedResult = stringHelpers.replaceAll(userInput, '/', '\\');

    var resultParts = stringHelpers.split(normalizedResult, '\\', true);

    if (!resultParts) {
      return;
    }

    let builtPath: string = '';
    for (let pathPart of resultParts) {
      builtPath = builtPath.concat(pathPart);
      processPath(builtPath);
    }
  }
}

function processPath(path: string): void {
  if (path.endsWith('\\')) {
    fileSystem.createDirectory(path);
  } else {
    fileSystem.writeToFile(path, 'foo');
  }
}
