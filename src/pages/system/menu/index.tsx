import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import services from '@/services';

const Menu = () => {
  const columns: ProColumns<API.Indexable>[] = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
    },
    {
      title: '图标',
      dataIndex: 'icon',
    },
    {
      title: '排序',
      dataIndex: 'orderNum',
    },
    {
      title: '权限标识',
      dataIndex: 'perms',
    },
    {
      title: '组件路径',
      dataIndex: 'component',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: () => [
        <Button key="edit" type="link">
          修改
        </Button>,
        <Button key="add" type="link">
          新增
        </Button>,
        <Popconfirm key="delete" title="是否确认删除？">
          <Button type="link" danger>
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <ProTable
      rowKey="menuId"
      headerTitle="菜单列表"
      bordered
      columns={columns}
      request={async (params, sort, filter) => {
        console.log(params, sort, filter);
        return services.SystemController.listMenu({
          ...params,
          pageNum: params.current,
        });
      }}
      toolbar={{
        actions: [
          <Button key="add" type="primary" icon={<PlusOutlined />}>
            新增
          </Button>,
        ],
      }}
    />
  );
};

export default Menu;
