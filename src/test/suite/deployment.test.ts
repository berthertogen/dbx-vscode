import sinon = require('sinon');
import { Deployment } from '../../deployment';
import assert = require('assert');
import { Logger } from '../../logger';
import { window, workspace } from 'vscode';
import { beforeEach, afterEach } from 'mocha';

suite('Deployment', () => {
  let findFiles: sinon.SinonStub;
  let openTextDocument: sinon.SinonStub;
  let showErrorMessage: sinon.SinonStub;
  let sandbox: sinon.SinonSandbox = sinon.createSandbox();

  beforeEach(() => {
    findFiles = sandbox.stub(workspace, 'findFiles');
    openTextDocument = sandbox.stub(workspace, 'openTextDocument');
    showErrorMessage = sandbox.stub(window, 'showErrorMessage');

    openTextDocument.returns({
      getText: sinon.stub().returns(`
    environments:
      default:
        workflows:
          - name: workflow1
          - name: workflow2
      other:
        workflows:
          - name: workflow3
          - name: workflow4
    `)
    });

  });

  afterEach(() => {
    sandbox.restore();
  });

  test('shows error when deployment file not found', async () => {
    findFiles.returns([]);

    await Deployment.init(new Logger());

    sinon.assert.calledOnce(showErrorMessage);
    sinon.assert.alwaysCalledWithExactly(showErrorMessage, 'Unable to load conf/deployment.yml');
  });

  test('returns empty deployment when deployment file not found', async () => {
    findFiles.returns([]);

    const deployment = await Deployment.init(new Logger());

    assert.deepEqual(deployment.getEnvironments(), []);
  });

  test('has function to get environments', async () => {
    findFiles.returns([{ path: 'conf/deployment.yml' }]);
    const deployment = await Deployment.init(new Logger());

    const environments = deployment.getEnvironments();

    assert.equal(environments.length, 2);
    assert.deepEqual(environments, ['default', 'other']);
  });

  test('has function to get workflows', async () => {
    findFiles.returns([{ path: 'conf/deployment.yml' }]);
    const deployment = await Deployment.init(new Logger());

    const workflows = deployment.getWorkflows('default');

    assert.equal(workflows.length, 2);
    assert.deepEqual(workflows, ['workflow1', 'workflow2']);
  });

  test('function to get workflows returns [] on undefined', async () => {
    findFiles.returns([{ path: 'conf/deployment.yml' }]);
    const deployment = await Deployment.init(new Logger());

    const workflows = deployment.getWorkflows(undefined);

    assert.equal(workflows.length, 0);
  });
});
