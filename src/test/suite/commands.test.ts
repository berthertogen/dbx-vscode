import * as assert from 'assert';

import { Configure } from "../../commands/configure";
import { Execute } from "../../commands/execute";
import { HelloWorld } from "../../commands/hello-world";
import * as sinon from 'sinon';
import { VSCodeFactory } from './stubs';
import { Logger } from '../../logger';
import { beforeEach, afterEach } from 'mocha';
import { window } from 'vscode';
import { Deployment } from '../../deployment';

suite('Commands', () => {
	suite('HelloWorld', () => {
		let stub_showInformationMessage: sinon.SinonStub;
		let sandbox: sinon.SinonSandbox = sinon.createSandbox();

		beforeEach(() => {
			stub_showInformationMessage = sandbox.stub(window, 'showInformationMessage');
		});

		afterEach(() => {
			sandbox.restore();
		});

		test('has command id with prefix', () => {
			const command = new HelloWorld(new Logger());

			assert.equal(command.id, 'dbx.helloWorld');
		});

		test('has function to execute action', async () => {
			const command = new HelloWorld(new Logger());

			await command.action();

			sandbox.assert.calledOnceWithExactly(stub_showInformationMessage, `Hello World from dbx!`);
		});
	});

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
});
