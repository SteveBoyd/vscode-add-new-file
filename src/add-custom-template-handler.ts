import * as fileSystem from './file-system-wrapper';
import * as vscode from 'vscode';
import { processPath } from './add-new-file-handler';
import { getCustomConfigFilePath } from './providers/file-configuration-provider';

export function openCustomTemplateFile(context: vscode.ExtensionContext) {
  const customTemplateFilePath: vscode.Uri = getCustomConfigFilePath(context);

  if (!fileSystem.fileExists(customTemplateFilePath.fsPath)) {
    processPath(customTemplateFilePath.fsPath, context);
  }

  vscode.window.showTextDocument(customTemplateFilePath);
}
