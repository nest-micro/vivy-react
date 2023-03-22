import {
  type DrawerFormProps,
  type ProFormInstance,
  DrawerForm,
  ProFormText,
  ProFormRadio,
  ProFormTextArea,
  ProFormSelect,
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
      title={record.dictCode ? `更新字典-${record.dictLabel}` : `新增字典`}
      onFinish={async (formData) => {
        props.onFinish?.(formData);
        console.log(formData);
        return true;
      }}
    >
      <ProFormText name="dictType" label="字典类型" rules={[{ required: true }]} disabled />
      <ProFormText name="dictLabel" label="数据标签" rules={[{ required: true }]} />
      <ProFormText name="dictValue" label="数据键值" rules={[{ required: true }]} />
      <ProFormText name="cssClass" label="样式属性" />
      <ProFormText name="dictSort" label="显示排序" />
      <ProFormSelect
        name="listClass"
        label="回显样式"
        fieldProps={{
          options: [
            {
              value: 'default',
              label: '默认',
            },
            {
              value: 'primary',
              label: '主要',
            },
            {
              value: 'success',
              label: '成功',
            },
            {
              value: 'info',
              label: '信息',
            },
            {
              value: 'warning',
              label: '警告',
            },
            {
              value: 'danger',
              label: '危险',
            },
          ],
        }}
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
      <ProFormTextArea name="remark" label="备注" />
    </DrawerForm>
  );
};

export default UpdateForm;
