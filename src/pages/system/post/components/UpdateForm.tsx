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
import { useModel } from '@umijs/max';
import { addPost, updatePost, infoPost } from '@/apis/system/post';
import type { SysPost } from '@/apis/types/system/post';

interface UpdateFormProps extends DrawerFormProps {
  record: Nullable<SysPost>;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ record, ...props }) => {
  const formRef = useRef<ProFormInstance>();

  /**
   * 注册字典数据
   */
  const { selectDict } = useModel('dict');
  const sysNormalDisable = selectDict('sys_normal_disable');

  /**
   * 获取初始化数据
   */
  useEffect(() => {
    formRef.current?.resetFields();
    if (record) {
      infoPost(record.postId).then((info) => {
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
      await updatePost({
        ...values,
        postId: record.postId,
      });
    } else {
      await addPost(values);
    }
    formRef.current?.resetFields();
  };

  return (
    <DrawerForm
      {...props}
      layout="horizontal"
      labelCol={{ flex: '100px' }}
      formRef={formRef}
      title={record ? `编辑岗位-${record.postName}` : `新增岗位`}
      onFinish={async (values) => {
        await handleSubmit(values);
        props.onFinish?.(values);
        return true;
      }}
    >
      <ProFormText name="postName" label="岗位名称" rules={[{ required: true }]} />
      <ProFormText name="postCode" label="岗位编码" rules={[{ required: true }]} />
      <ProFormDigit name="postSort" label="显示顺序" fieldProps={{ min: 0, precision: 0 }} />
      <ProFormRadio.Group
        name="status"
        label="状态"
        initialValue={'0'}
        fieldProps={{ options: sysNormalDisable }}
      />
      <ProFormTextArea name="remark" label="备注" />
    </DrawerForm>
  );
};

export default UpdateForm;
