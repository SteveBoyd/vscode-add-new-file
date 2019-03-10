import * as vscode from "vscode";

import { FileSystemWrapper } from "./file-system-wrapper";

const fileSystem: FileSystemWrapper = new FileSystemWrapper();

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.addNewFile",
    () => {
      vscode.window.showInputBox().then((result: string | undefined) => {
        if (result) {
          const appRoot = vscode.workspace.rootPath;
          const filePath = `${appRoot}\\${result}`;
          fileSystem.writeToFile(filePath, "foo");
        }
      });
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
