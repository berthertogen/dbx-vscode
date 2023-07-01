import { window } from "vscode";

export class Logger {
  log: any;
  constructor() {
    this.log = window.createOutputChannel("dbx", undefined);
  }

  write(message: string) {
    this.log.appendLine(message);
  }
}