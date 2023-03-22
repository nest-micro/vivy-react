import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useRef, useState } from 'react';
import { DictTag } from '@/components/Dict';
import UpdateForm from './components/UpdateForm';
import services from '@/services';

const Post = () => {
  const actionRef = useRef<ActionType>();
  const [updateOpen, setUpdateOpen] = useState(false);
  const [recordData, setRecordData] = useState<API.Indexable>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  /**
   * @description 表格配置
   */
  const columns: ProColumns<API.Indexable>[] = [
    {
      title: '参数主键',
      dataIndex: 'configId',
    },
    {
      title: '参数名称',
      dataIndex: 'configName',
    },
    {
      title: '参数键名',
      dataIndex: 'configKey',
    },
    {
      title: '参数键值',
      dataIndex: 'configValue',
      ellipsis: true,
    },
    {
      title: '系统内置',
      dataIndex: 'configType',
      render: (_, record) => {
        return <DictTag type={'sys_yes_no'} value={record.configType} />;
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record) => [
        <Button
          key="edit"
          type="link"
          onClick={() => {
            setRecordData(record);
            setUpdateOpen(true);
          }}
        >
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
    <>
      <ProTable
        rowKey="configId"
        headerTitle="参数列表"
        bordered
        columns={columns}
        actionRef={actionRef}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        request={async (params, sort, filter) => {
          console.log(params, sort, filter);
          return services.SystemController.listConfig({
            ...params,
            pageNum: params.current,
          });
        }}
        toolbar={{
          actions: [
            <Button
              key="add"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setRecordData({});
                setUpdateOpen(true);
              }}
            >
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
      <UpdateForm
        record={recordData}
        open={updateOpen}
        onOpenChange={setUpdateOpen}
        onFinish={async () => actionRef.current?.reload()}
      />
    </>
  );
};

export default Post;
