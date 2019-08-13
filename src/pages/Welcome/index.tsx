import React from 'react';

export interface CenterProps {
  form: any;
  dispatch: any;
  login: any;
  loading: boolean;
}

export default class Center extends React.PureComponent<CenterProps> {
  render() {
    return (
      <div style={{ marginTop: 'calc(50vh - 10px)' }}>
        <p style={{ margin: 'auto 0', textAlign: 'center' }}>首页</p>
      </div>
    );
  }
}
