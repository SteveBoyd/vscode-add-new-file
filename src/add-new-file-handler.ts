import * as vscode from 'vscode';
import { processPath } from './path-processor';

export function addNewFileFromCommand(context: vscode.ExtensionContext) {
  let rootPath = '';
  if (vscode.workspace.rootPath) {
    rootPath = `${vscode.workspace.rootPath}\\`;
  }

  const rootPathLength: number = rootPath.length;

  try {
    vscode.window
      .showInputBox({
        value: rootPath,
        valueSelection: [rootPathLength, rootPathLength]
      })
      .then((userInput: string | undefined) => processPath(userInput, context));
  } catch (exception) {
    console.error(exception);
  }
}

export function addNewFileFromExplorerContext(
  uri: vscode.Uri,
  context: vscode.ExtensionContext
) {
  let rootPath = '';
  if (uri && uri.fsPath) {
    rootPath = `${uri.fsPath}\\`;
  } else if (vscode.workspace.rootPath) {
    rootPath = `${vscode.workspace.rootPath}\\`;
  }

  const rootPathLength: number = rootPath.length;

  try {
    vscode.window
      .showInputBox({
        value: rootPath,
        valueSelection: [rootPathLength, rootPathLength]
      })
      .then((userInput: string | undefined) => processPath(userInput, context));
  } catch (exception) {
    console.error(exception);
  }
}
