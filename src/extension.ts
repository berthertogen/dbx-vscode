// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { HelloWorld, Execute } from './commands';
import { Logger } from './logger';

export function activate(context: vscode.ExtensionContext) {
	activate_with_vscode(vscode, context);
}

export function activate_with_vscode(vscode: any, context: vscode.ExtensionContext){
	const log = new Logger(vscode);
	const commands = [
		new HelloWorld(vscode, log),
		new Execute(vscode, log),
	]
	const disposables = commands.map(command => vscode.commands.registerCommand(command.id, async () => await command.action()));
	disposables.forEach(disposable => context.subscriptions.push(disposable));
}

export function deactivate() {}
