import * as vscode from "vscode";

import { FileSystemWrapper } from "./file-system-wrapper";

export class AddNewFileHandler {
  public addNewFile() {
    vscode.window.showInputBox().then(
      (result: string | undefined): void => {
        if (result) {
          const appRoot = vscode.workspace.rootPath;
          const filePath = `${appRoot}\\${result}`;

          const fileSystem = new FileSystemWrapper();
          fileSystem.writeToFile(filePath, "foo");
        }
      }
    );
  }
}
