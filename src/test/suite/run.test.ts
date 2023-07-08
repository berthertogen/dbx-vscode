import { rejects } from 'assert';
import { createSandbox, SinonSandbox, SinonStub }  from 'sinon';
import { window } from 'vscode';
import { beforeEach, afterEach } from 'mocha';
import { Run } from '../../run';
import * as crypto from 'crypto';

suite('Run', () => {
  const sandbox: SinonSandbox = createSandbox();

  let randomUUID: SinonStub;

  beforeEach(() => {
    randomUUID = sandbox.stub(crypto, 'randomUUID');
    randomUUID.returns('36b8f84d-df4e-4d49-b662-bcde71a8764f');
  });

  afterEach(() => {
    sandbox.restore();
  });

  test('no terminal rejects promise', async () => {
    sandbox.stub(window, 'activeTerminal').returns(undefined);
    sandbox.stub(window, 'createTerminal').returns(undefined as any);
    const runPromise = new Run().run('command');

    rejects(runPromise);
  });

  // test('run finds and starts terminal, runs command and sends stop event', async () => {
  //   const version = await new Run().run('dbx --version');

  //   assert.ok(version.length > 61)
  //   const versionNoTimestamp = version.substring(61, version.length - 1).trim()
  //   assert.equal(versionNoTimestamp, ':brick: [red]Databricks[/red] e[red]X[/red]tensions aka [red]dbx[/red], version ~> [green]0.8.17[/green]');
  // }).timeout(10000);
});
