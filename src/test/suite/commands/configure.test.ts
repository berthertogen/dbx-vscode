import * as assert from 'assert';

import * as sinon from 'sinon';
import { beforeEach, afterEach } from 'mocha';
import { window } from 'vscode';
import { Configure } from '../../../commands/configure';
import { Logger } from '../../../logger';

suite('Configure', () => {
	let sandbox: sinon.SinonSandbox = sinon.createSandbox();

	let showInputBox: sinon.SinonStub;
	let activeTerminal: sinon.SinonStub;
	let createTerminal: sinon.SinonStub;
	const terminal = { show: sandbox.stub(), sendText: sandbox.stub() } as any;
	let showInformationMessage: sinon.SinonStub;

	beforeEach(() => {
		showInputBox = sandbox.stub(window, 'showInputBox');
		activeTerminal = sandbox.stub(window, 'activeTerminal');
		createTerminal = sandbox.stub(window, 'createTerminal');
		showInformationMessage = sandbox.stub(window, 'showInformationMessage');

		showInputBox.returns('default');
		createTerminal.returns(terminal);
	});

	afterEach(() => {
		sandbox.restore();
	});
	test('has command id with prefix', () => {
		const command = new Configure(new Logger());

		assert.equal(command.id, 'dbx.configure');
	});

	test('has function to execute action', async () => {
		const command = new Configure(new Logger());

		await command.action();

		sinon.assert.calledOnce(terminal.show);
		sinon.assert.calledOnce(terminal.sendText);
		sinon.assert.alwaysCalledWithExactly(terminal.sendText, 'dbx configure --environment default');

		sinon.assert.calledOnce(showInformationMessage);
		sinon.assert.alwaysCalledWithExactly(showInformationMessage, 'Configuring environment default');
	});
});
