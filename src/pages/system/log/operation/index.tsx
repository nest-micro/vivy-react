import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Drawer, Descriptions } from 'antd';
import React, { useState } from 'react';
import { DictTag, DictText } from '@/components/Dict';
import services from '@/services';

const OperationLog = () => {
  const [open, setOpen] = useState(false);
  const [openData, setDataOpen] = useState<API.Indexable>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns: ProColumns<API.Indexable>[] = [
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
      dataIndex: 'businessType',
      render: (_, record) => {
        return <DictTag type={'sys_oper_type'} value={record.businessType} />;
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
      dataIndex: 'status',
      render: (_, record) => {
        return <DictTag type={'sys_common_status'} value={record.status} />;
      },
    },
    {
      title: '操作日期',
      dataIndex: 'operTime',
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
            setDataOpen(record);
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
          return services.SystemController.listOperlog({
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
      <Drawer title="操作日志详情" width={1000} open={open} onClose={() => setOpen(false)}>
        <Descriptions column={2}>
          <Descriptions.Item label="操作模块">
            {openData.title} / <DictText type={'sys_oper_type'} value={openData.businessType} />
          </Descriptions.Item>
          <Descriptions.Item label="登录信息">
            {openData.operName} / {openData.operIp} / {openData.operLocation}
          </Descriptions.Item>
          <Descriptions.Item label="请求方式">{openData.requestMethod}</Descriptions.Item>
          <Descriptions.Item label="请求地址">{openData.operUrl}</Descriptions.Item>
          <Descriptions.Item label="操作方法" span={2}>
            {openData.method}
          </Descriptions.Item>
          <Descriptions.Item label="请求参数" span={2}>
            {openData.operParam}
          </Descriptions.Item>
          <Descriptions.Item label="返回参数" span={2}>
            {openData.jsonResult}
          </Descriptions.Item>
          <Descriptions.Item label="操作状态">
            <DictText type={'sys_common_status'} value={openData.status} />
          </Descriptions.Item>
          <Descriptions.Item label="操作时间">{openData.operTime}</Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};

export default OperationLog;
