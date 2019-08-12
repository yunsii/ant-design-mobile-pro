// import DocumentTitle from 'react-document-title';
import React from 'react';
import { connect } from 'dva';
// import { formatMessage } from 'umi-plugin-react/locale';

import { ConnectState } from '@/models/connect';
import styles from './UserLayout.less';

export interface UserLayoutProps {
}

const UserLayout: React.SFC<UserLayoutProps> = props => {
  const {
    children,
  } = props;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default connect(({ settings }: ConnectState) => ({
  ...settings,
}))(UserLayout);
