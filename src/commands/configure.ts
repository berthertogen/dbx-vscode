import { Logger } from "../logger";
import { window } from 'vscode';
import { Command } from "./base";


export class Configure extends Command {
  constructor(log: Logger) {
    super("configure", log);
  }

  async action() {
    const environment = await window.showInputBox({ placeHolder: 'environment', title: 'Select the environment to configure' });
    this.log.write(`Selected environment ${environment}`);

    const terminal = window.activeTerminal || window.createTerminal({
      name: `Configure environment`,
      hideFromUser: false,
    });
    window.showInformationMessage(`Configuring environment ${environment}`);
    this.log.write(`dbx configure --environment ${environment}`);
    terminal.show();
    terminal.sendText(`dbx configure --environment ${environment}`);

    // const root = workspace.rootPath
    // const projectDocument = await workspace.openTextDocument(`${root}/.dbx/project.json`)
    // this.log.write(`Open ${root}/.dbx/project.json`);
    // await window.showTextDocument(projectDocument);
  }
}
