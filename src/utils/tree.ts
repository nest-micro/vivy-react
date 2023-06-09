interface TreeConfig {
  id: string;
  pid: string;
  children: string;
}

const DEFAULT_CONFIG: TreeConfig = {
  id: 'id',
  children: 'children',
  pid: 'pid',
};

const getConfig = (config: Partial<TreeConfig>) => {
  return Object.assign({}, DEFAULT_CONFIG, config);
};

/**
 * 列表转树
 * @param list 原始列表数据
 * @param config 配置
 * @returns 转换后的树数据
 */
export function listToTree<T = any>(list: any[], config: Partial<TreeConfig> = {}): T[] {
  const conf = getConfig(config) as TreeConfig;
  const nodeMap = new Map();
  const result: T[] = [];
  const { id, children, pid } = conf;

  for (const node of list) {
    node[children] = node[children] || [];
    nodeMap.set(node[id], node);
  }

  for (const node of list) {
    const parent = nodeMap.get(node[pid]);
    (parent ? parent[children] : result).push(node);
  }

  return result;
}
