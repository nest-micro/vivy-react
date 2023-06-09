import { Tree, Button, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import type { TreeProps, TreeDataNode } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { useRequest, useModel } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import { DictTag } from '@/components/Dict';
import UpdateForm from './components/UpdateForm';
import ImportForm from './components/ImportForm';
import { treeDept } from '@/apis/system/dept';
import { listUser, deleteUser } from '@/apis/system/user';
import type { SysUser } from '@/apis/types/system/user';

const User = () => {
  const actionRef = useRef<ActionType>();
  const [updateOpen, setUpdateOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [recordData, setRecordData] = useState<Nullable<SysUser>>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  /**
   * 注册字典数据
   */
  const { getDict, registerDict } = useModel('dict');
  useEffect(() => {
    registerDict(['sys_normal_disable']);
  }, []);

  /**
   * 部门树选择
   */
  const { data: deptData } = useRequest(treeDept);
  const [selectedDeptKeys, setSelectedDeptKeys] = useState<React.Key[]>([]);
  const onDeptSelect: TreeProps['onSelect'] = (selectedKeys) => {
    setSelectedDeptKeys(selectedKeys);
    actionRef.current?.reload();
  };

  /**
   * 删除用户
   * @param userIds 用户ID
   */
  const handleDelete = async (userIds: React.Key) => {
    await deleteUser(userIds);
    setSelectedRowKeys([]);
    actionRef.current?.reload();
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<SysUser>[] = [
    {
      title: '用户编号',
      dataIndex: 'userId',
      search: false,
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
    },
    {
      title: '用户昵称',
      dataIndex: 'nickName',
    },
    {
      title: '手机号码',
      dataIndex: 'phonenumber',
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
          onConfirm={() => handleDelete(record.userId)}
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
      <div className="flex h-full">
        <Tree
          className="w-[250px] pt-2 pb-2"
          defaultExpandAll
          onSelect={onDeptSelect}
          treeData={deptData as unknown as TreeDataNode[]}
          fieldNames={{ key: 'deptId', title: 'deptName' }}
        />
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
            const { items, meta } = await listUser({
              ...params,
              page: params.current,
              limit: params.pageSize,
              deptId: selectedDeptKeys[0] as number,
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
