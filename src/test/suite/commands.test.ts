import * as assert from 'assert';

import { HelloWorld, Execute } from '../../commands';
import * as sinon from 'sinon';
import { VSCodeFactory } from './stubs';
import { Logger } from '../../logger';

suite('Commands', () => {
	suite('HelloWorld', () => {
		test('has command id with prefix', () => {
			const vscodeFactory = new VSCodeFactory().create();
			const command = new HelloWorld(vscodeFactory.vscode, new Logger(vscodeFactory.vscode));

			assert.equal(command.id, 'dbx.helloWorld');
		});

		test('has function to execute action', async () => {
			const vscodeFactory = new VSCodeFactory().create();
			const command = new HelloWorld(vscodeFactory.vscode, new Logger(vscodeFactory.vscode));

			await command.action();

			sinon.assert.calledOnce(vscodeFactory.vscode.window.showInformationMessage);
		});
	});

	suite('Execute', () => {
		test('has command id with prefix', () => {
			const vscodeFactory = new VSCodeFactory().create();
			const command = new Execute(vscodeFactory.vscode, new Logger(vscodeFactory.vscode));

			assert.equal(command.id, 'dbx.execute');
		});

		test('has function to execute action', async () => {
			const vscodeFactory = new VSCodeFactory().create();
			const command = new Execute(vscodeFactory.vscode, new Logger(vscodeFactory.vscode));
			
			await command.action();

			sinon.assert.calledOnce(vscodeFactory.windowCreateTerminal.show);
			sinon.assert.calledOnce(vscodeFactory.windowCreateTerminal.sendText);
			sinon.assert.alwaysCalledWithExactly(vscodeFactory.windowCreateTerminal.sendText, 'dbx execute workflow1 --environment default');

			sinon.assert.calledOnce(vscodeFactory.vscode.window.showInformationMessage);
			sinon.assert.alwaysCalledWithExactly(vscodeFactory.vscode.window.showInformationMessage, 'Executing workflow workflow1 in environment default');
		});
	});
});
