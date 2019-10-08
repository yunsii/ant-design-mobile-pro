import React, { useState } from 'react';
import router from 'umi/router';
import classNames from 'classnames'
import { NavBar, Icon, Drawer } from 'antd-mobile';
import { DrawerProps } from 'antd-mobile/lib/drawer/PropsType'
import { NavBarProps } from 'antd-mobile/lib/nav-bar/PropsType';
import styles from './index.less';

export interface PageWrapperProps extends NavBarProps {
  title?: any;
  backable?: boolean;
  backPath?: string;
  fixed?: boolean;
  sidebar?: DrawerProps["sidebar"];
}

export default function PageWrapper(props: PageWrapperProps) {
  const {
    title,
    backable,
    backPath,
    fixed,
    className,
    leftContent,
    sidebar,
    children,
    ...rest
  } = props;
  const [open, setOpen] = useState(false);

  let backableConfig: any = {};
  let drawerConfig: any = {};
  if (leftContent && sidebar) {
    drawerConfig = {
      leftContent,
      onLeftClick: () => { setOpen(!open) },
    }
  } else if (backable) {
    backableConfig = {
      icon: <Icon type="left" />,
      onLeftClick: () => backPath ? router.push(backPath) : router.goBack(),
    };
  }

  return (
    <div>
      <NavBar
        mode="dark"
        {...backableConfig}
        {...drawerConfig}
        className={classNames(fixed ? styles.fixed : '', className)}
      >
        {title}
      </NavBar>
      {leftContent && sidebar ?
        <Drawer
          className={styles.drawer}
          style={{ height: `calc(${document.documentElement.clientHeight}px - ${90 / 75}rem)` }}
          contentStyle={{ color: '#A6A6A6', textAlign: 'center' }}
          sidebar={sidebar}
          open={open}
          onOpenChange={() => { setOpen(!open) }}
        />
        : null}
      {fixed ?
        <div className={styles.fixedContent}>
          {children}
        </div> :
        children}
    </div>
  )
}

PageWrapper.defaultProps = {
  fixed: true,
}
