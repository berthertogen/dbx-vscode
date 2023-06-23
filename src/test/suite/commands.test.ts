import * as assert from 'assert';

import { HelloWorld, Execute } from '../../commands';
import * as sinon from 'sinon';

suite('Commands', () => {
	function vscode() {
		return {
			window: {
				showInformationMessage: sinon.stub(),
				createTerminal: sinon.stub(),
				showQuickPick: sinon.stub(),
			},
			workspace: {
				findFiles: sinon.stub(),
			}
		};
	}
	function log(){
		return {
			write: sinon.stub(),
		};
	}

	suite('HelloWorld', () => {
		test('has command id with prefix', () => {
			const vscodeInstance = vscode();
			const command = new HelloWorld(vscodeInstance, null as any);
	
			assert.equal(command.id, 'dbx.helloWorld');
		});
	
		test('has function to execute action', async () => {
			const vscodeInstance = vscode();
			const command = new HelloWorld(vscodeInstance, null as any);
	
			command.action()
			
			sinon.assert.calledOnce(vscodeInstance.window.showInformationMessage);
		});
	});
	
	suite('Execute', () => {
		test('has command id with prefix', () => {
			const vscodeInstance = vscode();
			const command = new Execute(vscodeInstance, null as any);
	
			assert.equal(command.id, 'dbx.execute');
		});
	
		test('has function to execute action', async () => {
			const vscodeInstance = vscode();
			const command = new Execute(vscodeInstance, log() as any);
			const terminal = { sendText: sinon.stub() }
			vscodeInstance.window.createTerminal.returns(terminal);
			const file = { then: sinon.stub() }
			vscodeInstance.workspace.findFiles.returns(file);
			
			command.action()
			
			sinon.assert.calledOnce(vscodeInstance.window.createTerminal);
			sinon.assert.alwaysCalledWithExactly(vscodeInstance.window.createTerminal, `Executing workflow`);

			sinon.assert.calledOnce(terminal.sendText);
			sinon.assert.alwaysCalledWithExactly(terminal.sendText, 'dbx execute someworkflow');

			sinon.assert.calledOnce(vscodeInstance.workspace.findFiles);
			sinon.assert.alwaysCalledWithExactly(vscodeInstance.workspace.findFiles, 'conf/deployment.yml', null, 1, null);

			// sinon.assert.calledOnce(vscodeInstance.window.showQuickPick);
			// sinon.assert.alwaysCalledWithExactly(vscodeInstance.window.showQuickPick, '');
		});
	});
});
