import { equal } from 'assert';
import { activate } from '../../extension';
import { SinonSandbox, createSandbox, SinonStub, match }  from 'sinon';
import { commands, window } from 'vscode';
import { beforeEach, afterEach } from 'mocha';
import { ConfigurationNodeProvider } from '../../configuration-node-provider';

suite('Extensions', () => {
	const sandbox: SinonSandbox = createSandbox();

	let registerCommand: SinonStub;
	let registerTreeDataProvider: SinonStub;

	beforeEach(() => {
		registerCommand = sandbox.stub(commands, 'registerCommand');
		registerTreeDataProvider = sandbox.stub(window, 'registerTreeDataProvider');
	});

	afterEach(() => {
		sandbox.restore();
	});

	test('maps and adds commands to context', async () => {
		const context = { subscriptions: [] } as any;
		await activate(context);

		equal(context.subscriptions.length, 3);
		sandbox.assert.calledWith(registerCommand, 'dbx.helloWorld');
		sandbox.assert.calledWith(registerCommand, 'dbx.execute');
		sandbox.assert.calledWith(registerCommand, 'dbx.configure');
	});
	
	test('registers TreeDataProvider with ConfigurationNodeProvider', async () => {
		const context = { subscriptions: [] } as any;
		await activate(context);

		sandbox.assert.calledWith(registerTreeDataProvider, 'dbx-configuration', match.instanceOf(ConfigurationNodeProvider));
	});
});
