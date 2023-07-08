import { window } from "vscode";
import { join } from 'path';
import { tmpdir } from 'os';
import { randomUUID } from 'crypto';
import { readFile, writeFile } from "fs/promises";
import { watch } from "fs";

export class Run {

  async run(command: string): Promise<string> {
    const terminal = window.activeTerminal || window.createTerminal({
      name: `dbx:Run command`,
      hideFromUser: false,
    });
    if (terminal) {
      const uuid = randomUUID();
      const dir = tmpdir();
      const outputFile = join(dir, `${uuid}-output.log`);
      const triggerFile = join(dir, `${uuid}-finished.log`);
      terminal.sendText(command + ` > ${outputFile} && echo "finished" > ${triggerFile}`);
      return this.watchForFileUpdate(outputFile, triggerFile);
    }
    return Promise.reject('No terminal found');
  }
  
  async watchForFileUpdate(outputFile: string, triggerFile: string): Promise<string> {
    await writeFile(triggerFile, '');
    return new Promise<string>((resolve, reject) => {
      const watcher = watch(triggerFile);
      watcher
        .on('change', async () => {
          watcher.close();
          return readFile(outputFile, 'utf8')
            .then(resolve)
            .catch(reject);
        })
        .on('error', reject);
    });
  }
}