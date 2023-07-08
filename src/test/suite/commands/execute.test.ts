import { equal } from 'assert';

import { createSandbox, SinonSandbox, SinonStub } from 'sinon';
import { beforeEach, afterEach } from 'mocha';
import { window } from 'vscode';
import { Deployment } from '../../../deployment';
import { Execute } from '../../../commands/execute';
import { Logger } from '../../../logger';

suite('Execute', () => {
	let sandbox: SinonSandbox = createSandbox();

	let init: SinonStub;
	let showQuickPick: SinonStub;
	let showInformationMessage: SinonStub;
	let write: SinonStub;
	const logger = new Logger();

	beforeEach(() => {
		showQuickPick = sandbox.stub(window, 'showQuickPick');
		showInformationMessage = sandbox.stub(window, 'showInformationMessage');
		write = sandbox.stub(logger, 'write');
		init = sandbox.stub(Deployment, 'init');

		showQuickPick.withArgs(['default', 'other']).returns('default');
		showQuickPick.withArgs(['workflow1', 'workflow2']).returns('workflow1');
		init.returns({
			getEnvironments: () => ['default', 'other'],
			getWorkflows: () => ['workflow1', 'workflow2']
		} as any);
	});

	afterEach(() => {
		sandbox.restore();
	});

	test('has command id with prefix', () => {
		const command = new Execute(logger);

		equal(command.id, 'dbx.execute');
	});

	// TODO
	// test('has function to execute action', async () => {
	// 	const command = new Execute(logger);

	// 	await command.action();

	// 	sinon.assert.calledOnce(showInformationMessage);
	// 	sinon.assert.alwaysCalledWithExactly(showInformationMessage, 'Executing workflow workflow1 in environment default');
	// 	sinon.assert.calledWithMatch(write, sinon.match(/(Configuring new environment with name default)|(Environment configuration successfully finished)/));
	// }).timeout(60000);
});
