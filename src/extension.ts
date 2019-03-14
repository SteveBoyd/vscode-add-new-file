import * as vscode from 'vscode';
import * as addNewFileHandler from './add-new-file-handler';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'extension.addNewFile',
    addNewFileHandler.addNewFile
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
