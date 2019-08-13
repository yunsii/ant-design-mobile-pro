
import React from 'react';
import router from 'umi/router';
import { NavBar, Icon } from 'antd-mobile';
import { NavBarProps } from 'antd-mobile/lib/nav-bar/PropsType'

export interface PageWrapperProps extends NavBarProps {
  title?: any;
  backable?: boolean;
  backPath?: string;
}

export default function PageWrapper(props: PageWrapperProps) {
  const { title, backable, backPath, children } = props;

  let backableConfig: any = {
    icon: <Icon type="left" />,
    onLeftClick: () => backPath ? router.push(backPath) : router.goBack(),
  }
  if (!backable) {
    backableConfig = {};
  }

  return (
    <>
      <NavBar
        mode="dark"
        {...backableConfig}
      >
        {title}
      </NavBar>
      {children}
    </>
  )
}
