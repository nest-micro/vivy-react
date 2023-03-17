import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import React, { useState } from 'react';
import services from '@/services';

const Post = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const columns: ProColumns<API.Indexable>[] = [
    {
      title: '岗位编号',
      dataIndex: 'postId',
    },
    {
      title: '岗位编码',
      dataIndex: 'postCode',
    },
    {
      title: '岗位名称',
      dataIndex: 'postName',
    },
    {
      title: '显示顺序',
      dataIndex: 'postSort',
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
      rowKey="postId"
      headerTitle="岗位列表"
      bordered
      columns={columns}
      rowSelection={{
        selectedRowKeys,
        onChange: setSelectedRowKeys,
      }}
      request={async (params, sort, filter) => {
        console.log(params, sort, filter);
        return services.SystemController.listPost({
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

export default Post;
