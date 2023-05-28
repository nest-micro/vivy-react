import {
  type DrawerFormProps,
  type ProFormInstance,
  DrawerForm,
  ProFormText,
  ProFormDigit,
  ProFormRadio,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useRef, useEffect } from 'react';
import type { SysDictType } from '@/apis/types/system/dict-type';

interface UpdateFormProps extends DrawerFormProps {
  record: Nullable<SysDictType>;
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
      title={record ? `更新字典-${record.dictName}` : `新增字典`}
      onFinish={async (formData) => {
        props.onFinish?.(formData);
        console.log(formData);
        return true;
      }}
    >
      <ProFormText name="dictName" label="字典名称" rules={[{ required: true }]} />
      <ProFormText name="dictType" label="字典类型" rules={[{ required: true }]} />
      <ProFormDigit
        name="dictSort"
        label="显示顺序"
        fieldProps={{ min: 0, precision: 0 }}
        rules={[{ required: true }]}
      />
      <ProFormRadio.Group
        name="status"
        label="状态"
        initialValue={'0'}
        // request={() =>
        //   services.SystemController.getDict('sys_normal_disable').then(({ data }) =>
        //     data.map((i: any) => ({
        //       label: i.dictLabel,
        //       value: i.dictValue,
        //     })),
        //   )
        // }
      />
      <ProFormTextArea name="remark" label="备注" />
    </DrawerForm>
  );
};

export default UpdateForm;
