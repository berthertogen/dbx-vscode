import { equal } from 'assert';

import { createSandbox, SinonSandbox, SinonStub, match } from 'sinon';
import { beforeEach, afterEach } from 'mocha';
import { window } from 'vscode';
import { Configure } from '../../../commands/configure';
import { Logger } from '../../../logger';

suite('Configure', () => {
	const sandbox: SinonSandbox = createSandbox();
	let showInputBox: SinonStub;
	let showInformationMessage: SinonStub;
	let write: SinonStub;
	const logger = new Logger();

	beforeEach(() => {
		showInputBox = sandbox.stub(window, 'showInputBox');
		showInformationMessage = sandbox.stub(window, 'showInformationMessage');
		write = sandbox.stub(logger, 'write');

		showInputBox.returns('default');
	});

	afterEach(() => {
		sandbox.restore();
	});
	test('has command id with prefix', () => {
		const command = new Configure(logger);

		equal(command.id, 'dbx.configure');
	});

	test('has function to execute action', async () => {
		const command = new Configure(logger);

		await command.action();

		sandbox.assert.calledOnce(showInformationMessage);
		sandbox.assert.alwaysCalledWithExactly(showInformationMessage, 'Configuring environment default');
		sandbox.assert.calledWithMatch(write, match(/(Configuring new environment with name default)|(Environment configuration successfully finished)/));
	}).timeout(10000);
});
