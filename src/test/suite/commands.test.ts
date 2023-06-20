import * as assert from 'assert';

import { Command } from '../../commands';
import * as sinon from 'sinon';

suite('Commands', () => {

	function vscode() {
		return {
			window: {
				showInformationMessage: sinon.stub()
			}
		};
	}

	test('has command id with prefix', () => {
		const vscodeInstance = vscode();
    const commands = new Command("helloWorld", vscodeInstance);

    assert.equal(commands.id, 'dbx.helloWorld');
	});

	test('has function to execute action', async () => {
		const vscodeInstance = vscode();
    const commands = new Command("helloWorld", vscodeInstance);

		commands.action()
		
		sinon.assert.calledOnce(vscodeInstance.window.showInformationMessage);
	});
});
