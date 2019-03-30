import * as vscode from 'vscode';
import * as fileSystem from './file-system-wrapper';
import * as stringHelpers from './helpers/string-helpers';
import * as fileConfigurationProvider from './providers/file-configuration-provider';
import * as nameProvider from './providers/name-provider';
import * as templateHelpers from './helpers/file-template-helpers';

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
  console.log(uri);
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

export function processPath(
  path: string | undefined,
  context: vscode.ExtensionContext
): void {
  if (path) {
    const customConfigPath = fileConfigurationProvider.getCustomConfigFilePath(
      context
    );
    const normalizedResult = stringHelpers.replaceAll(path, '/', '\\');
    const resultParts = stringHelpers.split(normalizedResult, '\\', true);

    if (!resultParts) {
      return;
    }

    let builtPath: string = '';
    for (let pathPart of resultParts) {
      builtPath = builtPath.concat(pathPart);
      const fileConfiguration = fileConfigurationProvider.getFileConfiguration(
        pathPart,
        customConfigPath.fsPath
      );

      if (fileConfiguration.Identifier === 'Directory') {
        fileSystem.createDirectory(builtPath);
        continue;
      }
      let template = fileConfiguration.FileTemplate;

      var runReplacement = templateHelpers.hasReplaceableSections(template);

      if (runReplacement) {
        var fileNameReplacement = nameProvider.getNameFromFileName(pathPart);
        template = templateHelpers.runReplacement(
          template,
          fileNameReplacement
        );
      }

      fileSystem.writeToFile(builtPath, template);
      vscode.workspace
        .openTextDocument(builtPath)
        .then(doc => vscode.window.showTextDocument(doc));
    }
  }
}
