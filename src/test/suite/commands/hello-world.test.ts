import * as assert from 'assert';
import * as sinon from 'sinon';
import { beforeEach, afterEach } from 'mocha';
import { window } from 'vscode';
import { HelloWorld } from '../../../commands/hello-world';
import { Logger } from '../../../logger';

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