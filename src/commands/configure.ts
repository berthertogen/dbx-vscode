import { Logger } from "../logger";
import { window } from 'vscode';
import { Command } from "./base";
import { Run } from "../run";


export class Configure extends Command {
  constructor(log: Logger) {
    super("configure", log);
  }

  async action() {
    const environment = await window.showInputBox({ placeHolder: 'environment', title: 'Select the environment to configure' });
    this.log.write(`Selected environment ${environment}`);

    window.showInformationMessage(`Configuring environment ${environment}`);
    const result = await new Run().run(`dbx configure --environment ${environment}`);
    this.log.write(result);
  }
}
