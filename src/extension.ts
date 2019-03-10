import * as vscode from "vscode";
import * as fs from "fs";

export function activate(context: vscode.ExtensionContext) {
  function writeToFile(path: string, content: string) {
    const data = new Uint8Array(Buffer.from("Hello Node.js"));
    fs.writeFileSync(path, data, {});
  }

  let disposable = vscode.commands.registerCommand(
    "extension.helloWorld",
    () => {
      vscode.window.showInputBox().then(result => {
        let test = vscode.window.activeTextEditor;
        console.log(result);
        if (result) {
          writeToFile(result, "foo");
        }
      });
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
