// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ExtensionContext, commands } from 'vscode';
import { HelloWorld } from "./commands/hello-world";
import { Execute } from './commands/execute';
import { Configure } from './commands/configure';
import { Logger } from './logger';

export function activate(context: ExtensionContext) {
	const log = new Logger();
	const myCommands = [
		new HelloWorld(log),
		new Execute(log),
		new Configure(log),
	];
	const disposables = myCommands.map(command => commands.registerCommand(command.id, async () => await command.action()));
	disposables.forEach(disposable => context.subscriptions.push(disposable));
}

export function deactivate() {}
