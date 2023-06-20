export class Command {
  id: string = "";
  vscode: any;
  constructor(id: string, vscode: any) {
    this.id = `dbx.${id}`	;
    this.vscode = vscode;
  }

  action() {
    this.vscode.window.showInformationMessage('Hello World from dbx!');
  }
}