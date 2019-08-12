import React, { useEffect } from 'react';
// import Link from 'umi/link';
import { connect } from 'dva';
import { Dispatch, ConnectState } from '@/models/connect';
// import { formatMessage } from 'umi-plugin-react/locale';

export interface BasicLayoutProps {
  dispatch: Dispatch;
}

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { dispatch, children } = props;
  /**
   * constructor
   */

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
      dispatch({
        type: 'settings/getSetting',
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
