import { Logger } from "../logger";
import { window } from 'vscode';
import { Command } from "./base";


export class HelloWorld extends Command {
  constructor(log: Logger) {
    super("helloWorld", log);
  }

  async action() {
    window.showInformationMessage('Hello World from dbx!');
  }
}
