import * as assert from 'assert';

import * as sinon from 'sinon';
import { beforeEach, afterEach } from 'mocha';
import { window } from 'vscode';
import { Deployment } from '../../../deployment';
import { Execute } from '../../../commands/execute';
import { Logger } from '../../../logger';

suite('Execute', () => {
	let sandbox: sinon.SinonSandbox = sinon.createSandbox();

	let stub_init: sinon.SinonStub;
	let stub_showQuickPick: sinon.SinonStub;
	let stub_createTerminal: sinon.SinonStub;
	const stub_terminal = { show: sandbox.stub(), sendText: sandbox.stub() } as any
	let stub_showInformationMessage: sinon.SinonStub;

	beforeEach(() => {
		stub_showQuickPick = sandbox.stub(window, 'showQuickPick');
		stub_createTerminal = sandbox.stub(window, 'createTerminal');
		stub_showInformationMessage = sandbox.stub(window, 'showInformationMessage');
		stub_init = sandbox.stub(Deployment, 'init');

		stub_showQuickPick.withArgs(['default', 'other']).returns('default');
		stub_showQuickPick.withArgs(['workflow1', 'workflow2']).returns('workflow1');
		stub_createTerminal.returns(stub_terminal);
		stub_init.returns({
			getEnvironments: () => ['default', 'other'],
			getWorkflows: () => ['workflow1', 'workflow2']
		} as any);
	});

	afterEach(() => {
		sandbox.restore();
	});

	test('has command id with prefix', () => {
		const command = new Execute(new Logger());

		assert.equal(command.id, 'dbx.execute');
	});

	test('has function to execute action', async () => {
		const command = new Execute(new Logger());

		await command.action();

		sinon.assert.calledOnce(stub_terminal.show);
		sinon.assert.calledOnce(stub_terminal.sendText);
		sinon.assert.alwaysCalledWithExactly(stub_terminal.sendText, 'dbx execute workflow1 --environment default');

		sinon.assert.calledOnce(stub_showInformationMessage);
		sinon.assert.alwaysCalledWithExactly(stub_showInformationMessage, 'Executing workflow workflow1 in environment default');
	});
});
