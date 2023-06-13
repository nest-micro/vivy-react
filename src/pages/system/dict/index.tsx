import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Link, useModel, Access, useAccess } from '@umijs/max';
import { DictTag } from '@/components/Dict';
import UpdateForm from './components/UpdateForm';
import { listDictType, deleteDictType } from '@/apis/system/dict-type';
import type { SysDictType } from '@/apis/types/system/dict-type';

const DictType = () => {
  const { hasPermission } = useAccess();
  const actionRef = useRef<ActionType>();
  const [updateOpen, setUpdateOpen] = useState(false);
  const [recordData, setRecordData] = useState<Nullable<SysDictType>>(null);
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
    await deleteDictType(dictIds);
    setSelectedRowKeys([]);
    actionRef.current?.reload();
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<SysDictType>[] = [
    {
      title: '字典编号',
      dataIndex: 'dictId',
      search: false,
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
        <Access key="update" accessible={hasPermission('system:dict:update')}>
          <Button
            type="link"
            onClick={() => {
              setRecordData(record);
              setUpdateOpen(true);
            }}
          >
            编辑
          </Button>
        </Access>,
        <Access key="delete" accessible={hasPermission('system:dict:delete')}>
          <Popconfirm title="是否确认删除？" onConfirm={() => handleDelete(record.dictId)}>
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </Access>,
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
        request={async (params) => {
          const { items, meta } = await listDictType({
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
            <Access key="add" accessible={hasPermission('system:dict:add')}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setRecordData(null);
                  setUpdateOpen(true);
                }}
              >
                新增
              </Button>
            </Access>,
            <Access key="delete" accessible={hasPermission('system:dict:delete')}>
              <Popconfirm
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
              </Popconfirm>
            </Access>,
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

export default DictType;
