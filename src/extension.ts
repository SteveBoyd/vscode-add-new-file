import * as vscode from 'vscode';
import * as addNewFileHandler from './add-new-file-handler';
import * as addCustomTemplateHandler from './add-custom-template-handler';

export function activate(context: vscode.ExtensionContext) {
  let addNewFileExtension = vscode.commands.registerCommand(
    'extension.addNewFile',
    () => addNewFileHandler.addNewFileFromCommand(context)
  );

  let explorerAddNewFileExtension = vscode.commands.registerCommand(
    'extension.explorerAddNewFile',
    (uri: vscode.Uri) =>
      addNewFileHandler.addNewFileFromExplorerContext(uri, context)
  );

  let editCustomTemplateExtension = vscode.commands.registerCommand(
    'extension.editCustomTemplateFile',
    () => addCustomTemplateHandler.openCustomTemplateFile(context)
  );

  context.subscriptions.push(addNewFileExtension);
  context.subscriptions.push(explorerAddNewFileExtension);
  context.subscriptions.push(editCustomTemplateExtension);
}

// this method is called when your extension is deactivated
export function deactivate() {}
