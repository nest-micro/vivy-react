import { Tree } from 'antd';
import type { TreeProps } from 'antd/es/tree';

const User = () => {
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  return (
    <div className="flex h-full">
      <Tree className="w-1/4 ant-tree-scroll" defaultExpandAll onSelect={onSelect} treeData={[]} />
    </div>
  );
};

export default User;
