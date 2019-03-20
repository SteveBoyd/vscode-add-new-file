import * as fileSystem from './file-system-wrapper';
import * as vscode from 'vscode';
import * as fileConfigProvider from './providers/file-configuration-provider';

export function addCustomTemplateFile(): void {
  const path = `${vscode.workspace.rootPath}\\file-type-configuration.json`;
  const data = fileConfigProvider.getDefaultFileConfigurationJson();

  fileSystem.writeToFile(path, data);
}
