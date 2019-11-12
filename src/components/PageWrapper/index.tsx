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
  setSidebar?: (setOpen: (open: boolean) => void) => DrawerProps["sidebar"];
}

export default function PageWrapper(props: PageWrapperProps) {
  const {
    title,
    backable,
    backPath,
    fixed = true,
    className,
    leftContent,
    setSidebar,
    children,
    ...rest
  } = props;
  const [open, setOpen] = useState(false);
  const useDrawer = leftContent && setSidebar;

  let backableConfig: any = {};
  let drawerConfig: any = {};
  if (leftContent && setSidebar) {
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

  const renderChildren = () => {
    if (useDrawer && setSidebar) {
      return (
        <Drawer
          className={styles.drawer}
          style={{ height: `calc(${document.documentElement.clientHeight}px - ${90 / 75}rem)` }}
          sidebar={setSidebar(setOpen)}
          open={open}
          onOpenChange={() => { setOpen(!open) }}
        >
          {children}
        </Drawer>
      )
    }
    return fixed ?
      <div className={styles.fixedContent}>
        {children}
      </div> :
      children
  }

  return (
    <div>
      <NavBar
        mode="dark"
        {...backableConfig}
        {...drawerConfig}
        className={classNames(fixed ? styles.fixed : '', className)}
        {...rest}
      >
        {title}
      </NavBar>
      {renderChildren()}
    </div>
  )
}
