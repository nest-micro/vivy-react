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
import { useRef, useEffect } from 'react';
import services from '@/services';

interface UpdateFormProps extends DrawerFormProps {
  record: API.Indexable;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ record, ...props }) => {
  const formRef = useRef<ProFormInstance>();

  /**
   * @description 获取初始化数据
   */
  useEffect(() => {
    formRef.current?.resetFields();
    formRef.current?.setFieldsValue(record);
  }, [record]);

  return (
    <DrawerForm
      {...props}
      layout="horizontal"
      labelCol={{ flex: '100px' }}
      formRef={formRef}
      title={record.roleId ? `更新角色-${record.roleName}` : `新增角色`}
      onFinish={async (formData) => {
        props.onFinish?.(formData);
        console.log(formData);
        return true;
      }}
    >
      <ProFormText name="roleName" label="角色名称" rules={[{ required: true }]} />
      <ProFormText
        name="roleKey"
        label="权限字符"
        tooltip="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)"
        rules={[{ required: true }]}
      />
      <ProFormDigit
        name="roleSort"
        label="角色顺序"
        fieldProps={{ min: 0, precision: 0 }}
        rules={[{ required: true }]}
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
      <ProFormTreeSelect
        name="menuIds"
        label="菜单权限"
        fieldProps={{
          fieldNames: { label: 'menuName', value: 'menuId' },
          treeCheckable: true,
        }}
        request={() => services.SystemController.listMenu({}).then(({ data }) => data)}
      />
      <ProFormTextArea name="remark" label="备注" />
    </DrawerForm>
  );
};

export default UpdateForm;
