import * as assert from 'assert';
import { activate } from '../../extension';
import sinon = require('sinon');
import { commands } from 'vscode';
import { beforeEach, afterEach } from 'mocha';

suite('Extensions', () => {
	let sandbox: sinon.SinonSandbox = sinon.createSandbox();

	let registerCommand: sinon.SinonStub;

	beforeEach(() => {
		registerCommand = sandbox.stub(commands, 'registerCommand');
	});

	afterEach(() => {
		sandbox.restore();
	});

	test('maps and adds commands to context', () => {
		const context = { subscriptions: [] } as any;
		activate(context);

		assert.equal(context.subscriptions.length, 3);
		sinon.assert.calledWith(registerCommand, 'dbx.helloWorld');
		sinon.assert.calledWith(registerCommand, 'dbx.execute');
		sinon.assert.calledWith(registerCommand, 'dbx.configure');
	});
});
