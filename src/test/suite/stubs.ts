import sinon = require('sinon');
import { HelloWorld } from '../../commands';
import { Logger } from '../../logger';

function vscode() {
  const stub = {
    window: {
      showInformationMessage: sinon.stub(),
      createTerminal: sinon.stub(),
      showErrorMessage: sinon.stub(),
      createOutputChannel: sinon.stub(),
      showQuickPick: sinon.stub(),
    },
    workspace: {
      openTextDocument: sinon.stub(),
      findFiles: sinon.stub(),
    },
    commands: {
      registerCommand: sinon.stub(),
    },
  };
  return stub;
}

export class VSCodeFactory {
  workspaceFindFiles: any[] = [{ path: 'conf/deployment.yml' }];
  windowCreateOutputChannel: any = { appendLine: sinon.stub() };
  workspaceOpenTextDocument: any = { getText: sinon.stub().returns(`
  environments:
    default:
      workflows:
        - name: workflow1
        - name: workflow2
    other:
      workflows:
        - name: workflow3
        - name: workflow4
  `) };
  windowCreateTerminal: any = { sendText: sinon.stub(), show: sinon.stub() };

  vscode: any;
  constructor() {
  }

  withWorkspaceFindFiles(workspaceFindFiles: any[]) {
    this.workspaceFindFiles = workspaceFindFiles;
    return this;
  }

  withWindowCreateOutputChannel(windowCreateOutputChannel: any) {
    this.windowCreateOutputChannel = windowCreateOutputChannel;
    return this;
  }

  withWorkspaceOpenTextDocument(text: string) {
    this.workspaceOpenTextDocument = { getText: sinon.stub().returns(text) };
    return this;
  }

  create() {
    this.vscode = vscode();

    this.vscode.workspace.findFiles.returns(this.workspaceFindFiles);
    
    this.vscode.window.createOutputChannel.returns(this.windowCreateOutputChannel);
    
    this.vscode.workspace.openTextDocument.returns(this.workspaceOpenTextDocument);

    this.vscode.window.createTerminal.returns(this.windowCreateTerminal);

    this.vscode.window.showQuickPick.withArgs(['default', 'other']).returns('default');
    this.vscode.window.showQuickPick.withArgs(['workflow1', 'workflow2']).returns('workflow1');

    return this;
  }
}