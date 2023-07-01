import * as assert from 'assert';

import * as sinon from 'sinon';
import { beforeEach, afterEach } from 'mocha';
import { window } from 'vscode';
import { Deployment } from '../../../deployment';
import { Execute } from '../../../commands/execute';
import { Logger } from '../../../logger';

suite('Execute', () => {
	let sandbox: sinon.SinonSandbox = sinon.createSandbox();

	let init: sinon.SinonStub;
	let showQuickPick: sinon.SinonStub;
	let createTerminal: sinon.SinonStub;
	const terminal = { show: sandbox.stub(), sendText: sandbox.stub() } as any;
	let showInformationMessage: sinon.SinonStub;

	beforeEach(() => {
		showQuickPick = sandbox.stub(window, 'showQuickPick');
		createTerminal = sandbox.stub(window, 'createTerminal');
		showInformationMessage = sandbox.stub(window, 'showInformationMessage');
		init = sandbox.stub(Deployment, 'init');

		showQuickPick.withArgs(['default', 'other']).returns('default');
		showQuickPick.withArgs(['workflow1', 'workflow2']).returns('workflow1');
		createTerminal.returns(terminal);
		init.returns({
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

		sinon.assert.calledOnce(terminal.show);
		sinon.assert.calledOnce(terminal.sendText);
		sinon.assert.alwaysCalledWithExactly(terminal.sendText, 'dbx execute workflow1 --environment default');

		sinon.assert.calledOnce(showInformationMessage);
		sinon.assert.alwaysCalledWithExactly(showInformationMessage, 'Executing workflow workflow1 in environment default');
	});
});
