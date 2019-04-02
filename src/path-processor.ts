import * as vscode from 'vscode';
import * as fileSystem from './file-system-wrapper';
import * as stringHelpers from './helpers/string-helpers';
import * as fileConfigurationProvider from './providers/file-configuration-provider';
import * as nameProvider from './providers/name-provider';
import * as templateHelpers from './helpers/file-template-helpers';

export function processPath(
  path: string | undefined,
  context: vscode.ExtensionContext
): void {
  if (path === undefined) {
    // Hits if user hits escape key
    return;
  }

  const pathUri = vscode.Uri.parse(path);
  if (pathUri.scheme === '') {
    vscode.window.showWarningMessage('Invalid path provided for new file.');
    return;
  }

  const normalizedResult = normalizePath(path);
  const resultParts = splitPath(normalizedResult);

  if (!resultParts) {
    return;
  }

  if (fileSystem.fileExists(path)) {
    const userOptions = ['Continue', 'Cancel'];
    vscode.window
      .showInformationMessage('File already exists.', ...userOptions)
      .then((selection: string | undefined) => {
        if (!selection || selection === userOptions[1]) {
          return;
        } else {
          processSplitPath(resultParts, context);
        }
      });
  } else {
    processSplitPath(resultParts, context);
  }
}

function normalizePath(path: string): string {
  return stringHelpers.replaceAll(path, '/', '\\');
}

function splitPath(path: string): string[] | null {
  return stringHelpers.split(path, '\\', true);
}

function processSplitPath(
  pathParts: string[],
  context: vscode.ExtensionContext
): void {
  const customConfigPath = fileConfigurationProvider.getCustomConfigFilePath(
    context
  );
  let builtPath: string = '';
  for (let pathPart of pathParts) {
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
      template = templateHelpers.runReplacement(template, fileNameReplacement);
    }

    fileSystem.writeToFile(builtPath, template);
    vscode.workspace
      .openTextDocument(builtPath)
      .then(doc => vscode.window.showTextDocument(doc));
  }
}
