import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Drawer, Descriptions } from 'antd';
import React, { useState } from 'react';
import { DictTag, DictText } from '@/components/Dict';
import { listOperLog } from '@/apis/system/oper-log';
import { SysOperLog } from '@/apis/types/system/oper-log';

const OperationLog = () => {
  const [open, setOpen] = useState(false);
  const [recordData, setRecordData] = useState<Nullable<SysOperLog>>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  /**
   * @description 表格配置
   */
  const columns: ProColumns<SysOperLog>[] = [
    {
      title: '日志编号',
      dataIndex: 'operId',
    },
    {
      title: '系统模块',
      dataIndex: 'title',
    },
    {
      title: '操作类型',
      dataIndex: 'operType',
      render: (_, record) => {
        return <DictTag type={'sys_oper_type'} value={record.operType} />;
      },
    },
    {
      title: '请求方式',
      dataIndex: 'requestMethod',
    },
    {
      title: '操作人员',
      dataIndex: 'operName',
    },
    {
      title: '操作状态',
      dataIndex: 'operStatus',
      render: (_, record) => {
        return <DictTag type={'sys_oper_status'} value={record.operStatus} />;
      },
    },
    {
      title: '操作日期',
      dataIndex: 'createdTime',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record) => [
        <Button
          key="detail"
          type="link"
          onClick={() => {
            setOpen(true);
            setRecordData(record);
          }}
        >
          详情
        </Button>,
      ],
    },
  ];

  return (
    <>
      <ProTable
        rowKey="operId"
        headerTitle="操作日志"
        bordered
        columns={columns}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        request={async (params, sort, filter) => {
          console.log(params, sort, filter);
          const { items, meta } = await listOperLog({
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
      <Drawer title="操作日志详情" width={1000} open={open} onClose={() => setOpen(false)}>
        {recordData ? (
          <Descriptions column={2}>
            <Descriptions.Item label="操作模块">
              {recordData.title} / <DictText type={'sys_oper_type'} value={recordData.operType} />
            </Descriptions.Item>
            <Descriptions.Item label="登录信息">
              {recordData.operName} / {recordData.operIp} / {recordData.operLocation}
            </Descriptions.Item>
            <Descriptions.Item label="请求方式">{recordData.requestMethod}</Descriptions.Item>
            <Descriptions.Item label="请求地址">{recordData.requestUrl}</Descriptions.Item>
            <Descriptions.Item label="操作方法" span={2}>
              {recordData.operMethod}
            </Descriptions.Item>
            <Descriptions.Item label="请求参数" span={2}>
              {recordData.requestParam}
            </Descriptions.Item>
            <Descriptions.Item label="返回参数" span={2}>
              {recordData.requestResult}
            </Descriptions.Item>
            <Descriptions.Item label="错误消息" span={2}>
              {recordData.requestErrmsg}
            </Descriptions.Item>
            <Descriptions.Item label="操作状态" span={2}>
              <DictText type={'sys_oper_status'} value={recordData.operStatus} />
            </Descriptions.Item>
            <Descriptions.Item label="操作时间">{recordData.createdTime}</Descriptions.Item>
          </Descriptions>
        ) : null}
      </Drawer>
    </>
  );
};

export default OperationLog;
