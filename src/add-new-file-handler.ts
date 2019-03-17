import * as vscode from 'vscode';
import * as fileSystem from './file-system-wrapper';
import * as stringHelpers from './helpers/string-helpers';
import * as fileConfigurationProvider from './providers/file-configuration-provider';
import * as nameProvider from './providers/name-provider';
import * as templateHelpers from './helpers/file-template-helpers';

export function addNewFile() {
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
      const fileConfiguration = fileConfigurationProvider.getFileConfiguration(
        pathPart
      );

      if (fileConfiguration.identifier === 'Directory') {
        fileSystem.createDirectory(builtPath);
        continue;
      }
      let template = fileConfiguration.fileTemplate;

      var runReplacement = templateHelpers.hasReplaceableSections(template);

      if (runReplacement) {
        var fileNameReplacement = nameProvider.getNameFromFileName(pathPart);
        template = templateHelpers.runReplacement(
          template,
          fileNameReplacement
        );
      }

      fileSystem.writeToFile(builtPath, template);
    }
  }
}
