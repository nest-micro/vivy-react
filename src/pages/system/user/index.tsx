import { Tree, Button, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import type { TreeProps } from 'antd/es/tree';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import React, { useState } from 'react';
import services from '@/services';

const User = () => {
  const { data: deptData } = useRequest(services.SystemController.listDept);
  const onDeptSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const columns: ProColumns<API.Indexable>[] = [
    {
      title: '用户编号',
      dataIndex: 'userId',
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
    },
    {
      title: '用户昵称',
      dataIndex: 'nickName',
    },
    {
      title: '部门',
      dataIndex: 'deptName',
    },
    {
      title: '手机号码',
      dataIndex: 'phonenumber',
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
    <div className="flex h-full">
      {deptData?.data ? (
        <Tree
          className="w-1/4 pt-2 pb-2"
          defaultExpandAll
          onSelect={onDeptSelect}
          treeData={deptData.data}
          fieldNames={{ key: 'deptId', title: 'deptName' }}
        />
      ) : null}
      <ProTable
        className="w-3/4 pl-4"
        rowKey="userId"
        headerTitle="用户列表"
        bordered
        columns={columns}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        request={async (params, sort, filter) => {
          console.log(params, sort, filter);
          return services.SystemController.listUser({
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
            <Button key="upload" icon={<UploadOutlined />}>
              导入
            </Button>,
          ],
        }}
      />
    </div>
  );
};

export default User;
