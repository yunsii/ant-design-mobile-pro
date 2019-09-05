import React from 'react';
import router from 'umi/router';
import classNames from 'classnames'
import { NavBar, Icon } from 'antd-mobile';
import { NavBarProps } from 'antd-mobile/lib/nav-bar/PropsType';
import styles from './index.less';

export interface PageWrapperProps extends NavBarProps {
  title?: any;
  backable?: boolean;
  backPath?: string;
  fixed?: boolean;
}

export default function PageWrapper(props: PageWrapperProps) {
  const { title, backable, backPath, fixed, className, children } = props;

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
        className={classNames(fixed ? styles.fixed : '', className)}
      >
        {title}
      </NavBar>
      {fixed ?
        <div style={{ paddingTop: '1rem' }}>
          {children}
        </div> :
        children}
    </>
  )
}

PageWrapper.defaultProps = {
  fixed: true,
}
