import {
  type DrawerFormProps,
  type ProFormInstance,
  DrawerForm,
  ProFormText,
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
      title={record.dictId ? `更新字典-${record.dictName}` : `新增字典`}
      onFinish={async (formData) => {
        props.onFinish?.(formData);
        console.log(formData);
        return true;
      }}
    >
      <ProFormText name="dictName" label="字典名称" rules={[{ required: true }]} />
      <ProFormText name="dictType" label="字典类型" rules={[{ required: true }]} />
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
      <ProFormTextArea name="remark" label="备注" />
    </DrawerForm>
  );
};

export default UpdateForm;
