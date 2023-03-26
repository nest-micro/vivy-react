import {
  type DrawerFormProps,
  type ProFormInstance,
  DrawerForm,
  ProFormText,
  ProFormTreeSelect,
  ProFormSelect,
  ProFormRadio,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useRef, useEffect } from 'react';
import { useRequest } from '@umijs/max';
import services from '@/services';

interface UpdateFormProps extends DrawerFormProps {
  record: API.Indexable;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ record, ...props }) => {
  const formRef = useRef<ProFormInstance>();

  /**
   * @description 获取初始化数据
   */
  const { data, loading } = useRequest(() => services.SystemController.getUser(record.userId), {
    refreshDeps: [record],
    initialData: { roles: [], posts: [] },
    onSuccess(res) {
      const user = res.data || {};
      user.roleIds = res.roleIds;
      user.postIds = res.roleIds;
      formRef.current?.setFieldsValue(user);
    },
  });
  useEffect(() => {
    formRef.current?.resetFields();
  }, [record]);

  return (
    <DrawerForm
      {...props}
      layout="horizontal"
      labelCol={{ flex: '100px' }}
      formRef={formRef}
      title={record.userId ? `更新用户-${record.nickName}` : `新增用户`}
      onFinish={async (formData) => {
        props.onFinish?.(formData);
        console.log(formData);
        return true;
      }}
    >
      {record.userId ? null : (
        <ProFormText name="userName" label="用户名称" rules={[{ required: true }]} />
      )}
      <ProFormText name="nickName" label="用户昵称" rules={[{ required: true }]} />
      <ProFormTreeSelect
        name="deptId"
        label="归属部门"
        fieldProps={{
          fieldNames: { label: 'deptName', value: 'deptId' },
        }}
        request={() => services.SystemController.listDept({}).then(({ data }) => data)}
      />
      <ProFormText name="phonenumber" label="手机号码" />
      <ProFormText name="email" label="邮箱" />
      <ProFormSelect
        name="sex"
        label="用户性别"
        fieldProps={{
          fieldNames: { label: 'dictLabel', value: 'dictValue' },
        }}
        request={() => services.SystemController.getDict('sys_user_sex').then(({ data }) => data)}
      />
      <ProFormRadio.Group
        name="status"
        label="状态"
        initialValue={'0'}
        request={() =>
          services.SystemController.getDict('sys_normal_disable').then(({ data }) =>
            data.map((i: any) => ({
              label: i.dictLabel,
              value: i.dictValue,
            })),
          )
        }
      />
      <ProFormSelect
        name="postIds"
        label="岗位"
        fieldProps={{
          mode: 'multiple',
          loading: loading,
          options: data?.posts,
          fieldNames: { label: 'postName', value: 'postId' },
        }}
      />
      <ProFormSelect
        name="roleIds"
        label="角色"
        fieldProps={{
          mode: 'multiple',
          loading: loading,
          options: data?.roles,
          fieldNames: { label: 'roleName', value: 'roleId' },
        }}
      />
      <ProFormTextArea name="remark" label="备注" />
    </DrawerForm>
  );
};

export default UpdateForm;