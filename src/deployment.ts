import * as YAML from 'yaml';
import { Logger } from './logger';
import { window, workspace } from 'vscode';

export class Deployment {
  deployment: any;
  private constructor(deployment: any) {
    this.deployment = deployment;
  }

  static async init(log: Logger): Promise<Deployment> {
    log.write(`Looking for file ./conf/deployment.yml`);
    const deploymentFile = await workspace.findFiles('conf/deployment.yml', undefined, 1, undefined);
    if (deploymentFile.length === 0) {
      window.showErrorMessage('Unable to load conf/deployment.yml');
      log.write(`Unable to load conf/deployment.yml`);
      return new Deployment({ environments: {} });
    }
    log.write(`Found file ${deploymentFile}`);
    const document = await workspace.openTextDocument(deploymentFile[0].path);
    let text = document.getText();
    const deployment = YAML.parse(text);
    return new Deployment(deployment);
  }

  getEnvironments(): string[] {
    return Object.keys(this.deployment.environments);
  }

  getWorkflows(environment: string | undefined): string[] {
    if (environment === undefined) {
      return [];
    }
    return this.deployment.environments[environment].workflows.map((w: any) => w.name);
  }
}