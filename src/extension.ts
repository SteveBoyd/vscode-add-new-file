import * as vscode from "vscode";

import { AddNewFileHandler } from "./add-new-file-handler";

const addNewFileHandler: AddNewFileHandler = new AddNewFileHandler();

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.addNewFile",
    addNewFileHandler.addNewFile
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
