import { history } from '@umijs/max';
import type { RunTimeLayoutConfig, RequestConfig } from '@umijs/max';
import { SettingDrawer } from '@ant-design/pro-components';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { QuestionCircleOutlined, GithubOutlined } from '@ant-design/icons';
import { message as Message, notification as Notification, Modal } from 'antd';
import defaultSettings from '../config/setting';
import { AvatarName, AvatarDropdown } from '@/components/Layout';
import { getToken, removeToken } from '@/utils/auth';
import { PageEnum } from '@/enums/pageEnum';
import services from './services';

/**
 * @name InitialState 全局初始化数据配置用于 Layout 用户信息和权限初始化
 * @doc https://umijs.org/docs/api/runtime-config#getinitialstate
 */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  token?: string;
  userInfo?: API.UserInfo;
}> {
  const token = getToken();
  const location = history.location;
  if (token && location.pathname !== PageEnum.BASE_LOGIN) {
    try {
      const userInfo = await services.UserController.getInfo();
      return {
        token,
        userInfo,
        settings: defaultSettings as Partial<LayoutSettings>,
      };
    } catch (error) {
      removeToken();
      history.push(PageEnum.BASE_LOGIN);
    }
  } else {
    removeToken();
    if (location.pathname !== PageEnum.BASE_LOGIN) {
      history.push(PageEnum.BASE_LOGIN);
    }
  }

  return {
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

/**
 * @name ProLayout 运行时布局配置
 * @doc https://procomponents.ant.design/components/layout#prolayout
 */
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  const user = initialState?.userInfo?.user || ({} as API.UserInfo['user']);

  return {
    avatarProps: {
      src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
      title: <AvatarName name={user.nickName} />,
      render: (_, children) => {
        return <AvatarDropdown>{children}</AvatarDropdown>;
      },
    },
    // waterMarkProps: {
    //   content: initialState?.settings?.title as string,
    // },
    bgLayoutImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    actionsRender: () => {
      return [<QuestionCircleOutlined key="doc" />, <GithubOutlined key="github" />];
    },
    // footerRender: () => {
    //   return <Footer />;
    // },
    childrenRender: (children) => {
      return (
        <>
          {children}
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            onSettingChange={(settings) => {
              setInitialState((preInitialState) => ({
                ...preInitialState,
                settings,
              }));
            }}
          />
        </>
      );
    },
    // onPageChange: (location) => {
    //   console.log('onPageChange', location);
    // },
    ...initialState?.settings,
  };
};

/**
 * @name Request 运行时布局配置
 * @doc https://umijs.org/docs/max/request
 */
export const request: RequestConfig = {
  timeout: 1000 * 60,
  requestInterceptors: [
    [
      (config: any) => {
        const token = getToken();
        const isToken = config.isToken === false;
        if (token && !isToken) {
          config.headers['Authorization'] = 'Bearer ' + token;
        }
        config.url = `/api${config.url}`;
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      },
    ],
  ],
  responseInterceptors: [
    [
      (response: any) => {
        const code = response.data.code || 200;
        const message = response.data.msg || '系统未知错误，请反馈给管理员';
        const skipErrorHandler = response.config.skipErrorHandler;

        // 错误判断
        if (skipErrorHandler) {
          if (code !== 200) {
            return Promise.reject(message);
          }
        } else if (code === 401) {
          Modal.confirm({
            title: '系统提示',
            content: '登录状态已过期，您可以继续留在该页面，或者重新登录',
            cancelText: '取消',
            okText: '重新登录',
            onOk() {
              history.push(PageEnum.BASE_LOGIN);
            },
          });
          return Promise.reject('无效的会话，或者会话已过期，请重新登录。');
        } else if (code === 500) {
          Message.error(message);
          return Promise.reject(message);
        } else if (code === 601) {
          Message.warning(message);
          return Promise.reject(message);
        } else if (code !== 200) {
          Notification.error({ message });
          return Promise.reject(message);
        }

        // 转换数据
        if (response.data.rows) {
          response.data.data = response.data.rows;
        }

        return response;
      },
      (error: any) => {
        let { message } = error;

        if (message === 'Network Error') {
          message = '后端接口连接异常';
        } else if (message.includes('timeout')) {
          message = '系统接口请求超时';
        } else if (message.includes('Request failed with status code')) {
          message = '系统接口' + message.substr(message.length - 3) + '异常';
        }

        Message.error(message);
        return Promise.reject(error);
      },
    ],
  ],
};
