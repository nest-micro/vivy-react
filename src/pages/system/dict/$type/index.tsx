import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useParams } from '@umijs/max';
import { DictTag } from '@/components/Dict';
import UpdateForm from './components/UpdateForm';
import { listDictData, deleteDictData } from '@/apis/system/dict-data';
import type { SysDictData } from '@/apis/types/system/dict-data';
import { useModel } from '@umijs/max';

const DictData = () => {
  const { type } = useParams();
  const actionRef = useRef<ActionType>();
  const [updateOpen, setUpdateOpen] = useState(false);
  const [recordData, setRecordData] = useState<Nullable<SysDictData>>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  /**
   * 注册字典数据
   */
  const { getDict, registerDict } = useModel('dict');
  useEffect(() => {
    registerDict(['sys_normal_disable']);
  }, []);

  /**
   * 删除字典类型
   * @param dictIds 字典类型ID
   */
  const handleDelete = async (dictIds: React.Key) => {
    await deleteDictData(dictIds);
    setSelectedRowKeys([]);
    actionRef.current?.reload();
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<SysDictData>[] = [
    {
      title: '字典编码',
      dataIndex: 'dictId',
      search: false,
    },
    {
      title: '字典标签',
      dataIndex: 'dictLabel',
    },
    {
      title: '字典键值',
      dataIndex: 'dictValue',
      search: false,
    },
    {
      title: '显示顺序',
      dataIndex: 'dictSort',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      fieldProps: { options: getDict('sys_normal_disable') || [] },
      render: (_, record) => {
        return <DictTag type={'sys_normal_disable'} value={record.status} />;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      search: false,
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
        <Popconfirm
          key="delete"
          title="是否确认删除？"
          onConfirm={() => handleDelete(record.dictId)}
        >
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
        headerTitle="字典列表"
        bordered
        columns={columns}
        actionRef={actionRef}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        request={async (params, sort, filter) => {
          console.log(params, sort, filter);
          const { items, meta } = await listDictData({
            ...params,
            page: params.current,
            limit: params.pageSize,
            dictType: type,
          });
          return {
            data: items,
            total: meta.totalItems,
          };
        }}
        toolbar={{
          actions: [
            <Button
              key="add"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setRecordData(null);
                setUpdateOpen(true);
              }}
            >
              新增
            </Button>,
            <Popconfirm
              key="delete"
              title="是否确认删除？"
              disabled={!selectedRowKeys.length}
              onConfirm={() => handleDelete(selectedRowKeys.join(','))}
            >
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

export default DictData;
