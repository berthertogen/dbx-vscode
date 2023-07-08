import { Deployment } from '../../deployment';
import { equal, deepEqual } from 'assert';
import { Logger } from '../../logger';

suite('Deployment', () => {

  test('has function to get environments and workflows', async () => {
    const deployment = await Deployment.init(new Logger());

    const environments = deployment.getEnvironments();

    equal(environments.length, 2);
    deepEqual(environments, ['default', 'other']);
  });

  test('has function to get workflows', async () => {
    const deployment = await Deployment.init(new Logger());

    const workflows = deployment.getWorkflows('default');

    equal(workflows.length, 2);
    deepEqual(workflows, ['workflow1', 'workflow2']);
  });
});
