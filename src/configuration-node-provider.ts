import { TreeDataProvider, Event, TreeItem, TreeItemCollapsibleState, Command, CancellationToken, ProviderResult } from 'vscode';
import { Deployment } from './deployment';

export class ConfigurationNodeProvider implements TreeDataProvider<ConfigurationNode> {

  constructor(private deployment: Deployment) { }

  onDidChangeTreeData?: Event<void | ConfigurationNode | ConfigurationNode[] | null | undefined> | undefined;

  getTreeItem(element: ConfigurationNode): ConfigurationNode | Thenable<ConfigurationNode> {
    return element;
  }

  getChildren(element?: ConfigurationNode | undefined): ProviderResult<ConfigurationNode[]> {
    if (!element) {
      return this.deployment.getEnvironments().map(env => new ConfigurationNode(ConfigurationNodeType.environment, env, TreeItemCollapsibleState.Collapsed));
    } else if (element.nodeType === ConfigurationNodeType.environment) {
      return this.deployment.getWorkflows(element?.label?.toString()).map(env => new ConfigurationNode(ConfigurationNodeType.workflow, env, TreeItemCollapsibleState.None));
    }
    return [];
  }

  getParent?(element: ConfigurationNode): ProviderResult<ConfigurationNode> {
    throw new Error('Method not implemented.');
  }

  resolveTreeItem?(item: ConfigurationNode, element: ConfigurationNode, token: CancellationToken): ProviderResult<ConfigurationNode> {
    throw new Error('Method not implemented.');
  }
}

export enum ConfigurationNodeType {
  environment,
  workflow,
}

export class ConfigurationNode extends TreeItem {
  nodeType: ConfigurationNodeType;

  constructor(nodeType: ConfigurationNodeType, label: string, collapsibleState: TreeItemCollapsibleState, command?: Command) {
    super(label, collapsibleState);
    this.nodeType = nodeType;
  }

}
