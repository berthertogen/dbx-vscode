// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ExtensionContext, commands, workspace, window } from 'vscode';
import { HelloWorld } from "./commands/hello-world";
import { Execute } from './commands/execute';
import { Configure } from './commands/configure';
import { Logger } from './logger';
import { ConfigurationNodeProvider } from './configuration-node-provider';
import { Deployment } from './deployment';

export async function activate(context: ExtensionContext) {
	const log = new Logger();
	const deployment = await Deployment.init(log);
	const myCommands = [
		new HelloWorld(log),
		new Execute(log),
		new Configure(log),
	];

	// const rootPath = (workspace.workspaceFolders && (workspace.workspaceFolders.length > 0))
	// 	? workspace.workspaceFolders[0].uri.fsPath : undefined;
	const configurationNodeProvider = new ConfigurationNodeProvider(deployment);
	window.registerTreeDataProvider('dbx-configuration', configurationNodeProvider);

	const disposables = myCommands.map(command => commands.registerCommand(command.id, async () => await command.action()));
	disposables.forEach(disposable => context.subscriptions.push(disposable));
}

export function deactivate() {}
