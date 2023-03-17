import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import React, { useState } from 'react';
import services from '@/services';

const Role = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const columns: ProColumns<API.Indexable>[] = [
    {
      title: '角色编号',
      dataIndex: 'roleId',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '权限字符',
      dataIndex: 'roleKey',
    },
    {
      title: '显示顺序',
      dataIndex: 'roleSort',
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
      rowKey="roleId"
      headerTitle="角色列表"
      bordered
      columns={columns}
      rowSelection={{
        selectedRowKeys,
        onChange: setSelectedRowKeys,
      }}
      request={async (params, sort, filter) => {
        console.log(params, sort, filter);
        return services.SystemController.listRole({
          ...params,
          pageNum: params.current,
        });
      }}
      toolbar={{
        actions: [
          <Button key="add" type="primary" icon={<PlusOutlined />}>
            新增
          </Button>,
          <Popconfirm key="delete" title="是否确认删除？" disabled={!selectedRowKeys.length}>
            <Button
              icon={<DeleteOutlined />}
              type="primary"
              danger
              disabled={!selectedRowKeys.length}
            >
              删除
            </Button>
          </Popconfirm>,
        ],
      }}
    />
  );
};

export default Role;
