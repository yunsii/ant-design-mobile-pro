// import DocumentTitle from 'react-document-title';
import React, { Fragment } from 'react';
import { connect } from 'dva';
import { } from 'antd-mobile'
// import { formatMessage } from 'umi-plugin-react/locale';
import Footer from './Footer';
import CustomIcon from '@/components/CustomIcon';
import { ConnectState } from '@/models/connect';
import styles from './UserLayout.less';

export interface UserLayoutProps {
}

const copyright = (
  <Fragment>
    Copyright <CustomIcon type="copyright" /> 2019 <a href="https://github.com/theprimone" target="_blank" style={{ color: '#fff', textDecoration: 'underline' }}>theprimone</a> 出品
  </Fragment>
);

const UserLayout: React.SFC<UserLayoutProps> = props => {
  const {
    children,
  } = props;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {children}
      </div>
      <Footer copyright={copyright} />
    </div>
  );
};

export default connect(({ settings }: ConnectState) => ({
  ...settings,
}))(UserLayout);
