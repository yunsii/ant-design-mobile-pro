import React, { useEffect } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Dispatch, ConnectState } from '@/models/connect';
import { getAuthority } from '@/utils/authority';
// import { formatMessage } from 'umi-plugin-react/locale';

export interface BasicLayoutProps {
  dispatch: Dispatch;
}

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { dispatch, children } = props;
  useEffect(() => {
    if (getAuthority()[0] !== 'admin') {
      router.push('/user/login');
    }
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);

  return (
    <div>
      {children}
    </div>
  );
};

export default connect(({ settings }: ConnectState) => ({
  settings,
}))(BasicLayout);
