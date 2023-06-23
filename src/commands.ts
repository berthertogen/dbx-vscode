import { Deployment } from "./deployment";
import { Logger } from "./logger";

export class Command {
  id: string = "";
  vscode: any;
  log: any;
  constructor(id: string, vscode: any, log: Logger) {
    this.id = `dbx.${id}`;
    this.vscode = vscode;
    this.log = log;
  }

  async action() {
    this.vscode.window.showInformationMessage('Hello World from dbx!');
  }
}

export class HelloWorld extends Command {
  constructor(vscode: any, log: Logger) {
    super("helloWorld", vscode, log);
  }

  async action() {
    this.vscode.window.showInformationMessage('Hello World from dbx!');
  }
}

export class Execute extends Command {
  constructor(vscode: any, log: Logger) {
    super("execute", vscode, log);
  }

  async action() {
    const deployment = await Deployment.init(this.vscode, this.log)
    const environments = deployment.getEnvironments();
    this.log.write(`Found environments ${environments}`);

    const environment = await this.vscode.window.showQuickPick(environments, { placeHolder: 'environment', title: 'Select the environment to execute in'  });
    this.log.write(`Selected environment ${environment}`);

    const workflows = deployment.getWorkflows(environment);
    this.log.write(`Found workflows ${workflows}`);
    const workflow = await this.vscode.window.showQuickPick(workflows, { placeHolder: 'workflow', title: 'Select the workflow to execute'  });
    this.log.write(`Selected workflow ${workflow}`);

    const terminal = this.vscode.window.createTerminal({
      name: `Executing workflow`,
      hideFromUser: false,
    });
    this.vscode.window.showInformationMessage(`Executing workflow ${workflow} in environment ${environment}`);
    this.log.write(`dbx execute ${workflow} --environment ${environment}`);
    terminal.show();
    terminal.sendText(`dbx execute ${workflow} --environment ${environment}`);
  }
}