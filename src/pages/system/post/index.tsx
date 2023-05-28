import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useRef, useState } from 'react';
import { DictTag } from '@/components/Dict';
import UpdateForm from './components/UpdateForm';
import { listPost } from '@/apis/system/post';
import type { SysPost } from '@/apis/types/system/post';

const Post = () => {
  const actionRef = useRef<ActionType>();
  const [updateOpen, setUpdateOpen] = useState(false);
  const [recordData, setRecordData] = useState<Nullable<SysPost>>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  /**
   * @description 表格配置
   */
  const columns: ProColumns<SysPost>[] = [
    {
      title: '岗位编号',
      dataIndex: 'postId',
    },
    {
      title: '岗位名称',
      dataIndex: 'postName',
    },
    {
      title: '岗位编码',
      dataIndex: 'postCode',
    },
    {
      title: '显示顺序',
      dataIndex: 'postSort',
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
        rowKey="postId"
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
          const { items, meta } = await listPost({
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
