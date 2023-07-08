import { equal } from 'assert';

import { createSandbox, SinonSandbox, SinonSpy } from 'sinon';
import { beforeEach, afterEach } from 'mocha';
import { window } from 'vscode';
import { HelloWorld } from '../../../commands/hello-world';
import { Logger } from '../../../logger';

	suite('HelloWorld', () => {
		const sandbox: SinonSandbox = createSandbox();
		let showInformationMessageSpy: SinonSpy;

		beforeEach(() => {
			showInformationMessageSpy = sandbox.spy(window, 'showInformationMessage');
		});

		afterEach(() => {
			sandbox.restore();
		});

		test('has command id with prefix', () => {
			const command = new HelloWorld(new Logger());

			equal(command.id, 'dbx.helloWorld');
		});

		test('has function to execute action', async () => {
			const command = new HelloWorld(new Logger());

			await command.action();

			sandbox.assert.calledOnceWithExactly(showInformationMessageSpy, `Hello World from dbx!`);
		});
	});