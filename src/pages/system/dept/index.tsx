import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useRef, useState } from 'react';
import { DictTag } from '@/components/Dict';
import UpdateForm from './components/UpdateForm';
import { treeDept, deleteDept } from '@/apis/system/dept';
import type { DeptTreeVo } from '@/apis/types/system/dept';

const Dept = () => {
  const actionRef = useRef<ActionType>();
  const [updateOpen, setUpdateOpen] = useState(false);
  const [recordData, setRecordData] = useState<Nullable<DeptTreeVo>>(null);

  /**
   * 删除部门
   * @param deptId 部门ID
   */
  const handleDelete = async (deptId: React.Key) => {
    await deleteDept(deptId);
    actionRef.current?.reload();
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<DeptTreeVo>[] = [
    {
      title: '部门名称',
      dataIndex: 'deptName',
    },
    {
      title: '排序',
      dataIndex: 'deptSort',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (_, record) => {
        return <DictTag type={'sys_normal_disable'} value={record.status} />;
      },
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
        <Popconfirm
          key="delete"
          title="是否确认删除？"
          onConfirm={() => handleDelete(record.deptId)}
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
        rowKey="deptId"
        headerTitle="部门列表"
        bordered
        columns={columns}
        actionRef={actionRef}
        search={false}
        request={async (params, sort, filter) => {
          console.log(params, sort, filter);
          const data = await treeDept();
          return {
            data: data,
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

export default Dept;
