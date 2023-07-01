import * as sinon from 'sinon';
import { Logger } from '../../logger';
import { window } from 'vscode';

suite('Logger', () => {
	test('has function to write', () => {
		const sandbox = sinon.createSandbox();
		const stub = sandbox.stub(window, 'createOutputChannel');
		const stubChild = { appendLine: sandbox.stub() } as any
		stub.returns(stubChild);

		const log = new Logger();
		log.write('Hello World');

		sandbox.assert.calledOnce(stub);
		// sandbox.assert.calledOnceWithExactly(stub, `dbx`, undefined as any);
		// sandbox.assert.calledOnceWithExactly(stubChild.appendLine, `Hello World`);
	});
});
