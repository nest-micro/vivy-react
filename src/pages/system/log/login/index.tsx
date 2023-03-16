import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import services from '@/services';

const LoginLog = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns: ProColumns<API.Indexable>[] = [
    {
      title: '访问编号',
      dataIndex: 'infoId',
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
    },
    {
      title: '登录地址',
      dataIndex: 'ipaddr',
    },
    {
      title: '登录地点',
      dataIndex: 'loginLocation',
    },
    {
      title: '浏览器',
      dataIndex: 'browser',
    },
    {
      title: '操作系统',
      dataIndex: 'os',
    },
    {
      title: '登录状态',
      dataIndex: 'status',
    },
    {
      title: '登录日期',
      dataIndex: 'loginTime',
    },
  ];

  return (
    <ProTable
      rowKey="infoId"
      headerTitle="登录日志"
      bordered
      columns={columns}
      actionRef={actionRef}
      rowSelection={{
        selectedRowKeys,
        onChange: setSelectedRowKeys,
      }}
      request={async (params, sort, filter) => {
        console.log(params, sort, filter);
        return services.SystemController.listLogininfor({
          ...params,
          pageNum: params.current,
        });
      }}
      toolbar={{
        actions: [
          <Popconfirm key="button" title="是否确认删除？" disabled={!selectedRowKeys.length}>
            <Button
              icon={<DeleteOutlined />}
              type="primary"
              danger
              disabled={!selectedRowKeys.length}
            >
              删除
            </Button>
          </Popconfirm>,
          <Popconfirm key="button" title="是否确认清空？">
            <Button icon={<DeleteOutlined />} type="primary" danger>
              清空
            </Button>
          </Popconfirm>,
          <Button key="button" icon={<DownloadOutlined />}>
            导出
          </Button>,
        ],
      }}
    />
  );
};

export default LoginLog;
