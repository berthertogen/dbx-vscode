import { OutputChannel, window } from "vscode";

export class Logger {
  log: OutputChannel;
  constructor() {
    this.log = window.createOutputChannel("dbx", undefined);
  }

  write(message: string) {
    this.log.appendLine(message);
  }
}