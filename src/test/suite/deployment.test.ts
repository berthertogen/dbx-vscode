import sinon = require('sinon');
import { Deployment } from '../../deployment';
import assert = require('assert');
import { Logger } from '../../logger';
import { VSCodeFactory } from './stubs';

suite('Deployment', () => {

  test('shows error when deployment file not found', async () => {
    const vscodeFactory = new VSCodeFactory()
      .withWorkspaceFindFiles([])
      .create();

    await Deployment.init(vscodeFactory.vscode, new Logger(vscodeFactory.vscode));

    sinon.assert.calledOnce(vscodeFactory.vscode.window.showErrorMessage);
    sinon.assert.alwaysCalledWithExactly(vscodeFactory.vscode.window.showErrorMessage, 'Unable to load conf/deployment.yml');
  });

  test('returns empty deployment when deployment file not found', async () => {
    const vscodeFactory = new VSCodeFactory()
      .withWorkspaceFindFiles([])
      .create();

    const deployment = await Deployment.init(vscodeFactory.vscode, new Logger(vscodeFactory.vscode));

    assert.deepEqual(deployment.getEnvironments(), []);
  });

  test('has function to get environments', async () => {
    const vscodeFactory = new VSCodeFactory()
      .create();
    const deployment = await Deployment.init(vscodeFactory.vscode, new Logger(vscodeFactory.vscode));

    const environments = deployment.getEnvironments();

    assert.equal(environments.length, 2);
    assert.deepEqual(environments, ['default', 'other']);
  });
  
  test('has function to get workflows', async () => {
    const vscodeFactory = new VSCodeFactory()
      .create();
    const deployment = await Deployment.init(vscodeFactory.vscode, new Logger(vscodeFactory.vscode));

    const workflows = deployment.getWorkflows('default');

    assert.equal(workflows.length, 2);
    assert.deepEqual(workflows, ['workflow1', 'workflow2']);
  });
});
