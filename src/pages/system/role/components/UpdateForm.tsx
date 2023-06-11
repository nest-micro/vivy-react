import {
  type DrawerFormProps,
  type ProFormInstance,
  DrawerForm,
  ProFormText,
  ProFormDigit,
  ProFormTreeSelect,
  ProFormRadio,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { TreeSelect } from 'antd';
import { useRef, useEffect } from 'react';
import { useModel } from '@umijs/max';
import { treeMenu } from '@/apis/system/menu';
import { addRole, updateRole, infoRole } from '@/apis/system/role';
import type { SysRole } from '@/apis/types/system/role';

interface UpdateFormProps extends DrawerFormProps {
  record: Nullable<SysRole>;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ record, ...props }) => {
  const formRef = useRef<ProFormInstance>();
  const { fetchDict } = useModel('dict');

  /**
   * 获取初始化数据
   */
  useEffect(() => {
    formRef.current?.resetFields();
    if (record) {
      infoRole(record.roleId).then((info) => {
        formRef.current?.setFieldsValue(info);
      });
    }
  }, [record]);

  /**
   * 提交表单
   * @param values 表单值
   */
  const handleSubmit = async (values: Recordable) => {
    if (record) {
      await updateRole({
        ...values,
        roleId: record.roleId,
      });
    } else {
      await addRole(values);
    }
    formRef.current?.resetFields();
  };

  return (
    <DrawerForm
      {...props}
      layout="horizontal"
      labelCol={{ flex: '100px' }}
      formRef={formRef}
      title={record ? `更新角色-${record.roleName}` : `新增角色`}
      onFinish={async (values) => {
        await handleSubmit(values);
        props.onFinish?.(values);
        return true;
      }}
    >
      <ProFormText name="roleName" label="角色名称" rules={[{ required: true }]} />
      <ProFormText name="roleCode" label="权限字符" rules={[{ required: true }]} />
      <ProFormDigit name="roleSort" label="显示顺序" fieldProps={{ min: 0, precision: 0 }} />
      <ProFormRadio.Group
        name="status"
        label="状态"
        initialValue={'0'}
        request={() => fetchDict('sys_normal_disable')}
      />
      <ProFormTreeSelect
        name="menuIds"
        label="菜单权限"
        request={treeMenu}
        fieldProps={{
          fieldNames: { label: 'menuName', value: 'menuId' },
          maxTagCount: 3,
          treeCheckable: true,
          treeCheckStrictly: true,
          showCheckedStrategy: TreeSelect.SHOW_ALL,
        }}
      />
      <ProFormTextArea name="remark" label="备注" />
    </DrawerForm>
  );
};

export default UpdateForm;
