import * as assert from 'assert';
import { activate_with_vscode } from '../../extension';
import { VSCodeFactory } from './stubs';
import sinon = require('sinon');

suite('Extensions', () => {
	test('maps and adds commands to context', () => {
		const vscodeFactory = new VSCodeFactory()
			.create();
		const context = { subscriptions: [] } as any; 	
		activate_with_vscode(vscodeFactory.vscode, context);

		assert.equal(context.subscriptions.length, 2);
    sinon.assert.calledWith(vscodeFactory.vscode.commands.registerCommand, 'dbx.helloWorld');
    sinon.assert.calledWith(vscodeFactory.vscode.commands.registerCommand, 'dbx.execute');
	});
});
