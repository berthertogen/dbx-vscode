import * as sinon from 'sinon';
import { Logger } from '../../logger';
import { VSCodeFactory } from './stubs';

suite('Logger', () => {
	test('has function to write', () => {
    const vscodeFactory = new VSCodeFactory().create();

		const log = new Logger(vscodeFactory.vscode);
		log.write('Hello World');

		sinon.assert.calledOnce(vscodeFactory.vscode.window.createOutputChannel);
		sinon.assert.alwaysCalledWithExactly(vscodeFactory.vscode.window.createOutputChannel, `dbx`);

		sinon.assert.calledOnce(vscodeFactory.windowCreateOutputChannel.appendLine);
		sinon.assert.alwaysCalledWithExactly(vscodeFactory.windowCreateOutputChannel.appendLine, `Hello World`);
	});
});
