import { Tree, Button, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import type { TreeProps } from 'antd/es/tree';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { useRequest, useModel } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import { DictTag } from '@/components/Dict';
import UpdateForm from './components/UpdateForm';
import ImportForm from './components/ImportForm';
import services from '@/services';

const User = () => {
  const { data: deptData } = useRequest(services.SystemController.listDept);
  const onDeptSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const actionRef = useRef<ActionType>();
  const [updateOpen, setUpdateOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [recordData, setRecordData] = useState<API.Indexable>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  /**
   * @description 字典数据
   */
  const { getDict, registerDict } = useModel('dict');
  useEffect(() => {
    registerDict(['sys_normal_disable']);
  }, []);

  /**
   * @description 表格配置
   */
  const columns: ProColumns<API.Indexable>[] = [
    {
      title: '用户编号',
      dataIndex: 'userId',
      hideInSearch: true,
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
    },
    {
      title: '用户昵称',
      dataIndex: 'nickName',
      hideInSearch: true,
    },
    {
      title: '归属部门',
      dataIndex: 'deptName',
      hideInSearch: true,
      render: (_, record) => {
        return record.dept.deptName;
      },
    },
    {
      title: '手机号码',
      dataIndex: 'phonenumber',
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
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTimeRange',
      valueType: 'dateRange',
      hideInTable: true,
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
      <div className="flex h-full">
        {deptData?.data ? (
          <Tree
            className="w-[250px] pt-2 pb-2"
            defaultExpandAll
            onSelect={onDeptSelect}
            treeData={deptData.data}
            fieldNames={{ key: 'deptId', title: 'deptName' }}
          />
        ) : null}
        <ProTable
          className="flex-1 pl-4"
          rowKey="userId"
          headerTitle="用户列表"
          bordered
          columns={columns}
          actionRef={actionRef}
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          request={async (params, sort, filter) => {
            console.log(params, sort, filter);
            return services.SystemController.listUser({
              ...params,
              pageNum: params.current,
              current: undefined,
              beginTime: params.createTimeRange?.[0],
              endTime: params.createTimeRange?.[1],
              createTimeRange: undefined,
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
              <Button
                key="upload"
                icon={<UploadOutlined />}
                onClick={() => {
                  setImportOpen(true);
                }}
              >
                导入
              </Button>,
            ],
          }}
        />
      </div>
      <UpdateForm
        record={recordData}
        open={updateOpen}
        onOpenChange={setUpdateOpen}
        onFinish={async () => actionRef.current?.reload()}
      />
      <ImportForm
        open={importOpen}
        onOpenChange={setImportOpen}
        onFinish={async () => actionRef.current?.reload()}
      />
    </>
  );
};

export default User;
