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
      title={record.configId ? `更新参数-${record.configName}` : `新增参数`}
      onFinish={async (formData) => {
        props.onFinish?.(formData);
        console.log(formData);
        return true;
      }}
    >
      <ProFormText name="configName" label="参数名称" rules={[{ required: true }]} />
      <ProFormText name="configKey" label="参数键名" rules={[{ required: true }]} />
      <ProFormText name="configValue" label="参数键值" rules={[{ required: true }]} />
      <ProFormRadio.Group
        name="configType"
        label="系统内置"
        initialValue={'Y'}
        request={() =>
          services.SystemController.getDict('sys_yes_no').then(({ data }) =>
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
