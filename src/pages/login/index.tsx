import { LockOutlined, UserOutlined, KeyOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { Space } from 'antd';
import { useRequest, useModel, history } from '@umijs/max';
import { Footer } from '@/components/Layout';
import { setToken } from '@/utils/auth';
import { PageEnum } from '@/enums/pageEnum';
import styles from './index.less';
import services from '@/services';

const Login = () => {
  const { refresh: refreshState } = useModel('@@initialState');

  const { data, refresh } = useRequest(() => {
    return services.UserController.code();
  });

  const handleSubmit = async (values: API.Indexable) => {
    try {
      const token = await services.UserController.login({
        ...values,
        uuid: data.uuid,
      });
      setToken(token.token);
      history.replace(PageEnum.BASE_HOME);
      await refreshState();
    } catch (error) {
      refresh();
    }
  };

  return (
    <div className="flex flex-col justify-center h-full">
      <div>
        <LoginForm title="Vivy" subTitle="基于 Nest & React 权限管理系统" onFinish={handleSubmit}>
          <ProFormText
            name="username"
            initialValue={'admin'}
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
            placeholder={'用户名'}
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            initialValue={'admin123'}
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
            }}
            placeholder={'密码'}
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
          <Space>
            <ProFormText
              name="code"
              fieldProps={{
                size: 'large',
                prefix: <KeyOutlined className={'prefixIcon'} />,
              }}
              placeholder={'验证码'}
              rules={[
                {
                  required: true,
                  message: '请输入验证码!',
                },
              ]}
            />
            <img
              className={styles.code}
              src={`data:image/gif;base64,${data?.img}`}
              onClick={refresh}
            />
          </Space>

          <div className="mb-5">
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a className="float-right">忘记密码</a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
