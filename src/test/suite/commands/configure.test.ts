import * as assert from 'assert';

import * as sinon from 'sinon';
import { beforeEach, afterEach } from 'mocha';
import { window } from 'vscode';
import { Configure } from '../../../commands/configure';
import { Logger } from '../../../logger';

suite('Configure', () => {
	let sandbox: sinon.SinonSandbox = sinon.createSandbox();

	let stub_showInputBox: sinon.SinonStub;
	let stub_activeTerminal: sinon.SinonStub;
	let stub_createTerminal: sinon.SinonStub;
	const stub_terminal = { show: sandbox.stub(), sendText: sandbox.stub() } as any
	let stub_showInformationMessage: sinon.SinonStub;

	beforeEach(() => {
		stub_showInputBox = sandbox.stub(window, 'showInputBox');
		stub_activeTerminal = sandbox.stub(window, 'activeTerminal');
		stub_createTerminal = sandbox.stub(window, 'createTerminal');
		stub_showInformationMessage = sandbox.stub(window, 'showInformationMessage');

		stub_showInputBox.returns('default');
		stub_createTerminal.returns(stub_terminal);
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

		sinon.assert.calledOnce(stub_terminal.show);
		sinon.assert.calledOnce(stub_terminal.sendText);
		sinon.assert.alwaysCalledWithExactly(stub_terminal.sendText, 'dbx configure --environment default');

		sinon.assert.calledOnce(stub_showInformationMessage);
		sinon.assert.alwaysCalledWithExactly(stub_showInformationMessage, 'Configuring environment default');
	});
});
