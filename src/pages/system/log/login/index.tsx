import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import React, { useState } from 'react';
import { DictTag } from '@/components/Dict';
import { listLoginLog } from '@/apis/system/login-log';
import { SysLoginLog } from '@/apis/types/system/login-log';

const LoginLog = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  /**
   * @description 表格配置
   */
  const columns: ProColumns<SysLoginLog>[] = [
    {
      title: '访问编号',
      dataIndex: 'loginId',
    },
    {
      title: '用户名称',
      dataIndex: 'loginName',
    },
    {
      title: '登录地址',
      dataIndex: 'loginIp',
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
      dataIndex: 'loginStatus',
      render: (_, record) => {
        return <DictTag type={'sys_oper_status'} value={record.loginStatus} />;
      },
    },
    {
      title: '登录日期',
      dataIndex: 'createdTime',
    },
  ];

  return (
    <ProTable
      rowKey="loginId"
      headerTitle="登录日志"
      bordered
      columns={columns}
      rowSelection={{
        selectedRowKeys,
        onChange: setSelectedRowKeys,
      }}
      request={async (params, sort, filter) => {
        console.log(params, sort, filter);
        const { items, meta } = await listLoginLog({
          // ...params,
          page: params.current,
          limit: params.pageSize,
        });
        return {
          data: items,
          total: meta.totalItems,
        };
      }}
      toolbar={{
        actions: [
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
          <Popconfirm key="clean" title="是否确认清空？">
            <Button icon={<DeleteOutlined />} type="primary" danger>
              清空
            </Button>
          </Popconfirm>,
          <Button key="download" icon={<DownloadOutlined />}>
            导出
          </Button>,
        ],
      }}
    />
  );
};

export default LoginLog;
