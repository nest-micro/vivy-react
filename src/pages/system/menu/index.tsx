import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useRef, useState } from 'react';
import { DictTag } from '@/components/Dict';
import UpdateForm from './components/UpdateForm';
import services from '@/services';

const Menu = () => {
  const actionRef = useRef<ActionType>();
  const [updateOpen, setUpdateOpen] = useState(false);
  const [recordData, setRecordData] = useState<API.Indexable>({});

  /**
   * @description 表格配置
   */
  const columns: ProColumns<API.Indexable>[] = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
    },
    {
      title: '菜单图标',
      dataIndex: 'icon',
    },
    {
      title: '菜单排序',
      dataIndex: 'orderNum',
    },
    {
      title: '权限标识',
      dataIndex: 'perms',
    },
    {
      title: '组件路径',
      dataIndex: 'component',
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
          key="add"
          type="link"
          onClick={() => {
            setRecordData(record);
            setUpdateOpen(true);
          }}
        >
          新增
        </Button>,
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
        rowKey="menuId"
        headerTitle="菜单列表"
        bordered
        columns={columns}
        actionRef={actionRef}
        request={async (params, sort, filter) => {
          console.log(params, sort, filter);
          return services.SystemController.listMenu({
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

export default Menu;
