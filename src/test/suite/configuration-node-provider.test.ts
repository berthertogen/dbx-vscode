import { TreeItem, TreeItemCollapsibleState } from "vscode";
import { ConfigurationNode, ConfigurationNodeProvider, ConfigurationNodeType } from "../../configuration-node-provider";
import { equal, deepStrictEqual } from "assert";
import { Deployment } from "../../deployment";
import { Logger } from "../../logger";

suite('Configuration Node Provider', () => {

  test('getTreeItem returns the given element', async () => {
	const log = new Logger();
  const configurationNodeProvider = new ConfigurationNodeProvider(await Deployment.init(log));
    const item = new ConfigurationNode(ConfigurationNodeType.environment, 'test', TreeItemCollapsibleState.Collapsed); 

    const item2 = await configurationNodeProvider.getTreeItem(item);
    equal(item, item2);
  });
  
  test('getChildren element undefined returns the environments', async () => {
    const log = new Logger();
    const configurationNodeProvider = new ConfigurationNodeProvider(await Deployment.init(log));

    const nodes = await configurationNodeProvider.getChildren(undefined);
    
    deepStrictEqual(nodes, [
      new ConfigurationNode(ConfigurationNodeType.environment, 'default', TreeItemCollapsibleState.Collapsed),
      new ConfigurationNode(ConfigurationNodeType.environment, 'other', TreeItemCollapsibleState.Collapsed),
    ]);
  });
  
  test('getChildren element is environment returns the workflows', async () => {
    const log = new Logger();
    const configurationNodeProvider = new ConfigurationNodeProvider(await Deployment.init(log));
    const defaultEnvironmentNode = new ConfigurationNode(ConfigurationNodeType.environment, 'default', TreeItemCollapsibleState.Collapsed);


    const nodes = await configurationNodeProvider.getChildren(defaultEnvironmentNode);
    
    deepStrictEqual(nodes, [
      new ConfigurationNode(ConfigurationNodeType.workflow, 'workflow1', TreeItemCollapsibleState.Collapsed),
      new ConfigurationNode(ConfigurationNodeType.workflow, 'workflow2', TreeItemCollapsibleState.Collapsed),
    ]);
  });
});
