import * as vscode from 'vscode';
import * as addNewFileHandler from './add-new-file-handler';
import * as addCustomTemplateHandler from './add-custom-template-handler';

export function activate(context: vscode.ExtensionContext) {
  let addNewFileExtension = vscode.commands.registerCommand(
    'extension.addNewFile',
    addNewFileHandler.addNewFile
  );

  let addCustomTemplateExtension = vscode.commands.registerCommand(
    'extension.addCustomTemplateFile',
    addCustomTemplateHandler.addCustomTemplateFile
  );

  context.subscriptions.push(addNewFileExtension);
  context.subscriptions.push(addCustomTemplateExtension);
}

// this method is called when your extension is deactivated
export function deactivate() {}
