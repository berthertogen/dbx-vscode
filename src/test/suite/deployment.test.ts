import sinon = require('sinon');
import { Deployment } from '../../deployment';
import assert = require('assert');
import { Logger } from '../../logger';
import { window, workspace } from 'vscode';
import { beforeEach, afterEach } from 'mocha';

suite('Deployment', () => {
  let stub_findFiles: sinon.SinonStub;
  let stub_openTextDocument: sinon.SinonStub;
  let stub_showErrorMessage: sinon.SinonStub;
  let sandbox: sinon.SinonSandbox = sinon.createSandbox();

  beforeEach(() => {
    stub_findFiles = sandbox.stub(workspace, 'findFiles');
    stub_openTextDocument = sandbox.stub(workspace, 'openTextDocument');
    stub_showErrorMessage = sandbox.stub(window, 'showErrorMessage');

    stub_openTextDocument.returns({
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
    })

  });

  afterEach(() => {
    sandbox.restore();
  });

  test('shows error when deployment file not found', async () => {
    stub_findFiles.returns([]);

    await Deployment.init(new Logger());

    sinon.assert.calledOnce(stub_showErrorMessage);
    sinon.assert.alwaysCalledWithExactly(stub_showErrorMessage, 'Unable to load conf/deployment.yml');
  });

  test('returns empty deployment when deployment file not found', async () => {
    stub_findFiles.returns([]);

    const deployment = await Deployment.init(new Logger());

    assert.deepEqual(deployment.getEnvironments(), []);
  });

  test('has function to get environments', async () => {
    stub_findFiles.returns([{ path: 'conf/deployment.yml' }]);
    const deployment = await Deployment.init(new Logger());

    const environments = deployment.getEnvironments();

    assert.equal(environments.length, 2);
    assert.deepEqual(environments, ['default', 'other']);
  });

  test('has function to get workflows', async () => {
    stub_findFiles.returns([{ path: 'conf/deployment.yml' }]);
    const deployment = await Deployment.init(new Logger());

    const workflows = deployment.getWorkflows('default');

    assert.equal(workflows.length, 2);
    assert.deepEqual(workflows, ['workflow1', 'workflow2']);
  });

  test('function to get workflows returns [] on undefined', async () => {
    stub_findFiles.returns([{ path: 'conf/deployment.yml' }]);
    const deployment = await Deployment.init(new Logger());

    const workflows = deployment.getWorkflows(undefined);

    assert.equal(workflows.length, 0);
  });
});
