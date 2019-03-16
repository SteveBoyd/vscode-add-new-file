import * as vscode from 'vscode';

import { FileSystemWrapper } from './file-system-wrapper';
import { StringHelpers } from './helpers/string-helpers';
import { FileTypeIdentifier } from './file-type-identifier';
import { FileType } from './enums/file-type.enum';

const fileSystem: FileSystemWrapper = new FileSystemWrapper();
const stringHelpers: StringHelpers = new StringHelpers();
const fileTypeIdentifier: FileTypeIdentifier = new FileTypeIdentifier();

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
      const fileType = fileTypeIdentifier.identifyFileType(pathPart);
      builtPath = builtPath.concat(pathPart);
      processPath(builtPath, fileType);
    }
  }
}

function processPath(path: string, fileType: FileType): void {
  switch (fileType) {
    case FileType.Directory:
      fileSystem.createDirectory(path);
      break;
    default:
      fileSystem.writeToFile(path, '');
      break;
  }
}
