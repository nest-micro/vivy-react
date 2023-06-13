import {
  type DrawerFormProps,
  type ProFormInstance,
  DrawerForm,
  ProFormText,
  ProFormDigit,
  ProFormRadio,
  ProFormTextArea,
  ProFormSelect,
} from '@ant-design/pro-components';
import { useModel, useParams } from '@umijs/max';
import { useRef, useEffect } from 'react';
import { addDictData, updateDictData, infoDictData } from '@/apis/system/dict-data';
import type { SysDictData } from '@/apis/types/system/dict-data';

interface UpdateFormProps extends DrawerFormProps {
  record: Nullable<SysDictData>;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ record, ...props }) => {
  const formRef = useRef<ProFormInstance>();
  const { type } = useParams();
  const { fetchDict } = useModel('dict');

  /**
   * 获取初始化数据
   */
  useEffect(() => {
    formRef.current?.resetFields();
    if (record) {
      infoDictData(record.dictId).then((info) => {
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
      await updateDictData({
        ...values,
        dictId: record.dictId,
        dictType: type,
      });
    } else {
      await addDictData({
        ...values,
        dictType: type,
      });
    }
    formRef.current?.resetFields();
  };

  return (
    <DrawerForm
      {...props}
      layout="horizontal"
      labelCol={{ flex: '100px' }}
      formRef={formRef}
      title={record ? `编辑字典-${record.dictLabel}` : `新增字典`}
      onFinish={async (values) => {
        await handleSubmit(values);
        props.onFinish?.(values);
        return true;
      }}
    >
      <ProFormText name="dictLabel" label="数据标签" rules={[{ required: true }]} />
      <ProFormText name="dictValue" label="数据键值" rules={[{ required: true }]} />
      <ProFormDigit name="dictSort" label="显示顺序" fieldProps={{ min: 0, precision: 0 }} />
      <ProFormSelect
        name="listClass"
        label="回显样式"
        fieldProps={{
          options: [
            { label: '默认', value: 'default' },
            { label: '主要', value: 'primary' },
            { label: '成功', value: 'success' },
            { label: '信息', value: 'info' },
            { label: '警告', value: 'warning' },
            { label: '危险', value: 'danger' },
          ],
        }}
      />
      <ProFormText name="cssClass" label="样式属性" />
      <ProFormRadio.Group
        name="status"
        label="状态"
        initialValue={'0'}
        request={() => fetchDict('sys_normal_disable')}
      />
      <ProFormTextArea name="remark" label="备注" />
    </DrawerForm>
  );
};

export default UpdateForm;
