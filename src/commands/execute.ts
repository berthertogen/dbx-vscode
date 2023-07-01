import { Deployment } from "../deployment";
import { Logger } from "../logger";
import { window } from 'vscode';
import { Command } from "./base";


export class Execute extends Command {
  constructor(log: Logger) {
    super("execute", log);
  }

  async action() {
    const deployment = await Deployment.init(this.log);
    const environments = deployment.getEnvironments();
    this.log.write(`Found environments ${environments}`);

    const environment = await window.showQuickPick(environments, { placeHolder: 'environment', title: 'Select the environment to execute in' });
    this.log.write(`Selected environment ${environment}`);

    const workflows = deployment.getWorkflows(environment);
    this.log.write(`Found workflows ${workflows}`);
    const workflow = await window.showQuickPick(workflows, { placeHolder: 'workflow', title: 'Select the workflow to execute' });
    this.log.write(`Selected workflow ${workflow}`);

    const terminal = window.createTerminal({
      name: `Executing workflow`,
      hideFromUser: false,
    });
    window.showInformationMessage(`Executing workflow ${workflow} in environment ${environment}`);
    this.log.write(`dbx execute ${workflow} --environment ${environment}`);
    terminal.show();
    terminal.sendText(`dbx execute ${workflow} --environment ${environment}`);
  }
}
