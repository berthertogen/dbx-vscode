import * as YAML from 'yaml'
import { Logger } from './logger';

export class Deployment {
  deployment: any;
  vscode: any;
  private constructor(vscode: any, deployment: any) {
    this.vscode = vscode;
    this.deployment = deployment;
  }

  static async init(vscode: any, log: Logger): Promise<Deployment> {
    log.write(`Looking for file ./conf/deployment.yml`);
    const deploymentFile = await vscode.workspace.findFiles('conf/deploymentqsdqs.yml', null, 1, null);
    if (deploymentFile.length == 0) {
      vscode.window.showErrorMessage('Unable to load conf/deployment.yml');
      log.write(`Unable to load conf/deployment.yml`);
      return new Deployment(vscode, { environments: {} });
    }
    log.write(`Found file ${deploymentFile}`);
    const document = await vscode.workspace.openTextDocument(deploymentFile[0].path);
    let text = document.getText();
    const deployment = YAML.parse(text);
    return new Deployment(vscode, deployment);
  }

  getEnvironments(): string[] {
    return Object.keys(this.deployment.environments);
  }

  getWorkflows(environment: string): string[] {
    return this.deployment.environments[environment].workflows.map((w: any) => w.name);
  }
}