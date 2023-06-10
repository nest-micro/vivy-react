import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useEffect, useRef } from 'react';
import { useModel } from '@umijs/max';
import { DictTag } from '@/components/Dict';
import { listLoginLog, clearLoginLog } from '@/apis/system/login-log';
import { ListLoginLogVo } from '@/apis/types/system/login-log';

const LoginLog = () => {
  const actionRef = useRef<ActionType>();

  /**
   * 注册字典数据
   */
  const { getDict, registerDict } = useModel('dict');
  useEffect(() => {
    registerDict(['sys_oper_status']);
  }, []);

  /**
   * 清空登录日志
   */
  const handleClearLog = async () => {
    await clearLoginLog();
    actionRef.current?.reload();
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<ListLoginLogVo>[] = [
    {
      title: '日志编号',
      dataIndex: 'loginId',
      search: false,
    },
    {
      title: '用户名称',
      dataIndex: 'loginName',
    },
    {
      title: '登录地址',
      dataIndex: 'loginIp',
      search: false,
    },
    {
      title: '登录地点',
      dataIndex: 'loginLocation',
      search: false,
    },
    {
      title: '浏览器',
      dataIndex: 'browser',
      search: false,
    },
    {
      title: '操作系统',
      dataIndex: 'os',
      search: false,
    },
    {
      title: '登录状态',
      dataIndex: 'loginStatus',
      valueType: 'select',
      fieldProps: { options: getDict('sys_oper_status') || [] },
      render: (_, record) => {
        return <DictTag type={'sys_oper_status'} value={record.loginStatus} />;
      },
    },
    {
      title: '登录日期',
      dataIndex: 'createdTime',
      valueType: 'dateTimeRange',
      render: (_, record) => {
        return record.createdTime;
      },
    },
  ];

  return (
    <ProTable
      rowKey="loginId"
      headerTitle="登录日志"
      bordered
      columns={columns}
      actionRef={actionRef}
      request={async (params, sort, filter) => {
        console.log(params, sort, filter);
        const { items, meta } = await listLoginLog({
          ...params,
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
          <Popconfirm key="clean" title="是否确认清空？" onConfirm={handleClearLog}>
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
