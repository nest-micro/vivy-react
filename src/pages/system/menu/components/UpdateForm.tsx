import {
  type DrawerFormProps,
  type ProFormInstance,
  DrawerForm,
  ProFormText,
  ProFormDigit,
  ProFormTreeSelect,
  ProFormRadio,
  ProFormDependency,
} from '@ant-design/pro-components';
import { AppstoreOutlined } from '@ant-design/icons';
import { useRef, useEffect } from 'react';
import { IconPicker } from '@/components/Icon';
import services from '@/services';

export type MenuType = { label: string; value: 'M' | 'C' | 'F' };
export const menuTypeOptions: MenuType[] = [
  { label: '目录', value: 'M' },
  { label: '菜单', value: 'C' },
  { label: '按钮', value: 'F' },
];

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
      title={record.menuId ? `更新菜单-${record.menuName}` : `新增菜单`}
      onFinish={async (formData) => {
        props.onFinish?.(formData);
        console.log(formData);
        return true;
      }}
    >
      <ProFormTreeSelect
        name="parentId"
        label="上级菜单"
        rules={[{ required: true }]}
        fieldProps={{
          fieldNames: { label: 'menuName', value: 'menuId' },
        }}
        request={() => services.SystemController.listMenu({}).then(({ data }) => data)}
      />
      <ProFormRadio.Group
        name="menuType"
        label="菜单类型"
        rules={[{ required: true }]}
        radioType="button"
        fieldProps={{
          options: menuTypeOptions,
        }}
      />
      <ProFormDependency name={['menuType']}>
        {({ menuType }: Record<string, MenuType['value']>) => (
          <>
            <ProFormText name="menuName" label="菜单名称" rules={[{ required: true }]} />
            <ProFormDigit name="orderNum" label="显示排序" fieldProps={{ min: 0, precision: 0 }} />
            {menuType !== 'F' ? (
              <ProFormText
                name="icon"
                label="菜单图标"
                fieldProps={{
                  addonBefore: (
                    <IconPicker
                      onChange={(value) => {
                        formRef.current?.setFieldValue('icon', value);
                      }}
                    >
                      <AppstoreOutlined />
                    </IconPicker>
                  ),
                }}
              />
            ) : null}
            {menuType !== 'F' ? (
              <ProFormRadio.Group
                name="isFrame"
                label="是否外链"
                tooltip="选择是外链则路由地址需要以`http(s)://`开头"
                fieldProps={{
                  options: [
                    { label: '是', value: '0' },
                    { label: '否', value: '1' },
                  ],
                }}
              />
            ) : null}
            {menuType !== 'F' ? (
              <ProFormText
                name="path"
                label="路由地址"
                tooltip="访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头"
              />
            ) : null}
            {menuType === 'C' ? (
              <ProFormText
                name="component"
                label="组件路径"
                tooltip="访问的组件路径，如：`system/user/index`，默认在`views`目录下"
              />
            ) : null}
            {menuType !== 'M' ? (
              <ProFormText
                name="perms"
                label="权限字符"
                tooltip="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasPermi('system:user:list')`)"
              />
            ) : null}
            {menuType === 'C' ? (
              <ProFormText
                name="query"
                label="路由参数"
                tooltip='访问路由的默认传递参数，如：`{"id": 1, "name": "ry"}`'
              />
            ) : null}
            {menuType === 'C' ? (
              <ProFormRadio.Group
                name="isCache"
                label="是否缓存"
                tooltip="选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致"
                initialValue={'1'}
                fieldProps={{
                  options: [
                    { label: '缓存', value: '0' },
                    { label: '不缓存', value: '1' },
                  ],
                }}
              />
            ) : null}
            {menuType !== 'F' ? (
              <ProFormRadio.Group
                name="visible"
                label="显示状态"
                tooltip="选择隐藏则路由将不会出现在侧边栏，但仍然可以访问"
                initialValue={'0'}
                request={() =>
                  services.SystemController.getDict('sys_show_hide').then(({ data }) =>
                    data.map((i: any) => ({
                      label: i.dictLabel,
                      value: i.dictValue,
                    })),
                  )
                }
              />
            ) : null}
            {menuType !== 'F' ? (
              <ProFormRadio.Group
                name="status"
                label="菜单状态"
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
            ) : null}
          </>
        )}
      </ProFormDependency>
    </DrawerForm>
  );
};

export default UpdateForm;
