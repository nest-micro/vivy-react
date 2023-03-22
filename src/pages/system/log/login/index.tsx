import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import React, { useState } from 'react';
import { DictTag } from '@/components/Dict';
import services from '@/services';

const LoginLog = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  /**
   * @description 表格配置
   */
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
      render: (_, record) => {
        return <DictTag type={'sys_common_status'} value={record.status} />;
      },
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
