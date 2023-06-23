export class Logger {
  log: any;
  constructor(vscode: any) {
    this.log = vscode.window.createOutputChannel("dbx");
  }

  write(message: string) {
    this.log.appendLine(message);
  }
}