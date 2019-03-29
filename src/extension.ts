import * as vscode from 'vscode';
import * as addNewFileHandler from './add-new-file-handler';
import * as addCustomTemplateHandler from './add-custom-template-handler';

export function activate(context: vscode.ExtensionContext) {
  let addNewFileExtension = vscode.commands.registerCommand(
    'extension.addNewFile',
    addNewFileHandler.addNewFileFromCommand
  );

  let addCustomTemplateExtension = vscode.commands.registerCommand(
    'extension.addCustomTemplateFile',
    addCustomTemplateHandler.addCustomTemplateFile
  );

  let explorerAddNewFileExtension = vscode.commands.registerCommand(
    'extension.explorerAddNewFile',
    addNewFileHandler.addNewFileFromExplorerContext
  );

  context.subscriptions.push(addNewFileExtension);
  context.subscriptions.push(addCustomTemplateExtension);
  context.subscriptions.push(explorerAddNewFileExtension);
}

// this method is called when your extension is deactivated
export function deactivate() {}
