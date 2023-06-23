import { TextDocument } from "vscode";
import * as YAML from 'yaml'

export class Deployment {
  deployment: any;
  vscode: any;
  private constructor(vscode: any, deployment: any) {
    this.vscode = vscode;
    this.deployment = deployment;
  }

  static async init(vscode: any, path: string): Promise<Deployment> {
    const document = await vscode.workspace.openTextDocument(path);
    let text = document.getText();
    const deployment = YAML.parse(text);
    return new Deployment(vscode, deployment);
  }

  async getEnvironments(): Promise<string[]> {
    return Object.keys(this.deployment.environments);
  }
  
  async getWorkflows(environment: string): Promise<string[]> {
    return this.deployment.environments[environment].workflows.map((w: any) => w.name);
  }
}