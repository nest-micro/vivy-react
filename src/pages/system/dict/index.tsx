import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useRef, useState } from 'react';
import { Link } from '@umijs/max';
import { DictTag } from '@/components/Dict';
import UpdateForm from './components/UpdateForm';
import services from '@/services';

const Dict = () => {
  const actionRef = useRef<ActionType>();
  const [updateOpen, setUpdateOpen] = useState(false);
  const [recordData, setRecordData] = useState<API.Indexable>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  /**
   * @description 表格配置
   */
  const columns: ProColumns<API.Indexable>[] = [
    {
      title: '字典编号',
      dataIndex: 'dictId',
    },
    {
      title: '字典名称',
      dataIndex: 'dictName',
    },
    {
      title: '字典类型',
      dataIndex: 'dictType',
      render: (_, record) => {
        return <Link to={`/system/dict/${record.dictType}`}>{record.dictType}</Link>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (_, record) => {
        return <DictTag type={'sys_normal_disable'} value={record.status} />;
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
        rowKey="dictId"
        headerTitle="岗位列表"
        bordered
        columns={columns}
        actionRef={actionRef}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        request={async (params, sort, filter) => {
          console.log(params, sort, filter);
          return services.SystemController.listDict({
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

export default Dict;
