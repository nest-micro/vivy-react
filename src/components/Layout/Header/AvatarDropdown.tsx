import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';
import { Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { history, useModel } from '@umijs/max';
import { removeToken } from '@/utils/auth';
import { PageEnum } from '@/enums/pageEnum';
import services from '@/services';

const AvatarDropdown: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setInitialState } = useModel('@@initialState');

  const logout = async () => {
    await services.UserController.logout();
    history.replace(PageEnum.BASE_LOGIN);
    removeToken();
  };

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s) => ({
            ...s,
            token: undefined,
            userInfo: undefined,
          }));
        });
        logout();
      } else {
        history.push(`/account/${key}`);
      }
    },
    [setInitialState],
  );

  return (
    <Dropdown
      menu={{
        onClick: onMenuClick,
        items: [
          {
            key: 'center',
            icon: <UserOutlined />,
            label: '个人中心',
          },
          {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: '退出登录',
          },
        ],
      }}
    >
      {children}
    </Dropdown>
  );
};

export default AvatarDropdown;
