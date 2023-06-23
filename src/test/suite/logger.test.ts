import * as sinon from 'sinon';
import { Logger } from '../../logger';

suite('Logger', () => {
	function vscode() {
		return {
			window: {
				createOutputChannel: sinon.stub(),
			}
		};
	}
	test('has function to write', () => {
		const vscodeInstance = vscode();
		const outputChannel = { appendLine: sinon.stub() }
		vscodeInstance.window.createOutputChannel.returns(outputChannel);

		const log = new Logger(vscodeInstance);
		log.write('Hello World');

		sinon.assert.calledOnce(vscodeInstance.window.createOutputChannel);
		sinon.assert.alwaysCalledWithExactly(vscodeInstance.window.createOutputChannel, `dbx`);

		sinon.assert.calledOnce(outputChannel.appendLine);
		sinon.assert.alwaysCalledWithExactly(outputChannel.appendLine, `Hello World`);
	});
});
