import { resolve } from 'path';
import { runTests } from '@vscode/test-electron';
import { existsSync } from 'fs';
import { mkdir, rm, writeFile } from 'fs/promises';

async function main() {
	try {
		const extensionDevelopmentPath = resolve(__dirname, '../../');
		const extensionTestsPath = resolve(__dirname, './suite/index');
		const dbxSample = resolve(__dirname, './dbx-sample');

		if (existsSync(dbxSample)) {
			await rm(dbxSample, { recursive: true, force: true });
    }
		await mkdir(dbxSample);
		await mkdir(`${dbxSample}/conf`);
		await writeFile(`${dbxSample}/conf/deployment.yml`, Buffer.from(`
    environments:
      default:
        workflows:
          - name: workflow1
          - name: workflow2
      other:
        workflows:
          - name: workflow3
          - name: workflow4
    `));

		// Download VS Code, unzip it and run the integration test
		await runTests({ extensionDevelopmentPath, extensionTestsPath, launchArgs: [dbxSample] });
	} catch (err) {
		console.error('Failed to run tests', err);
		process.exit(1);
	}
}

main();
