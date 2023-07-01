import { window } from "vscode";
import { Logger } from "../logger";

export class Command {
  id: string = "";
  vscode: any;
  log: any;
  constructor(id: string, log: Logger) {
    this.id = `dbx.${id}`;
    this.log = log;
  }

  async action() {
    window.showInformationMessage('Hello World from dbx!');
  }
}

