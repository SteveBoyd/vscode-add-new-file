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