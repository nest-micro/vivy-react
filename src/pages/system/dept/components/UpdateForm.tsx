import {
  type DrawerFormProps,
  type ProFormInstance,
  DrawerForm,
  ProFormText,
  ProFormDigit,
  ProFormTreeSelect,
  ProFormRadio,
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
      title={record.deptId ? `更新部门-${record.deptName}` : `新增部门`}
      onFinish={async (formData) => {
        props.onFinish?.(formData);
        console.log(formData);
        return true;
      }}
    >
      <ProFormTreeSelect
        name="parentId"
        label="上级部门"
        rules={[{ required: true }]}
        fieldProps={{
          fieldNames: { label: 'deptName', value: 'deptId' },
        }}
        request={() => services.SystemController.listDept({}).then(({ data }) => data)}
      />
      <ProFormText name="deptName" label="部门名称" rules={[{ required: true }]} />
      <ProFormDigit
        name="orderNum"
        label="显示排序"
        rules={[{ required: true }]}
        fieldProps={{ min: 0, precision: 0 }}
      />
      <ProFormText name="leader" label="负责人" />
      <ProFormText name="phone" label="联系电话" />
      <ProFormText name="email" label="邮箱" />
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
    </DrawerForm>
  );
};

export default UpdateForm;
