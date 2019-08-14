import React from 'react';
import { List, InputItem } from 'antd-mobile';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import Paper from '@/components/Paper';
import CustomIcon from '@/components/CustomIcon';
import { Button } from '@/components/CustomAntdMobile';
import { Dispatch, ConnectState } from '@/models/connect';
import styles from './Login.less';

const logo = '/logo.svg';
const logoStyle = {
  position: 'relative',
  width: 48,
  height: 48,
  padding: 12,
  boxSizing: 'content-box',
  backgroundColor: 'white',
  borderRadius: '50%',
  zIndex: 10,
  // backgroundImage: `url(${logo})`,
  // backgroundSize: '48px 48px',
}

const iconStyle = { fontSize: 24, color: '#776e6e' };

export interface LoginProps {
  form: any;
  dispatch: Dispatch;
  login: any;
  loading: boolean;
}

class Login extends React.PureComponent<LoginProps> {
  handleSubmit = () => {
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (err) return;
      console.log(values);
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
        },
      });
    })
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  }

  render() {
    const icon = (
      <div className={styles.logoWrapper}>
        <img
          width={48}
          src={logo}
          alt=""
          style={logoStyle as any}
        />
      </div>
    );
    const { form: { getFieldProps }, loading } = this.props;

    return (
      <div style={{ marginTop: 'calc(50vh - 180px)', padding: '0 16px' }}>
        <Paper icon={icon}>
          <List style={{ marginTop: 32 }}>
            <InputItem
              placeholder="请输入帐号"
              autoComplete='off'
              labelNumber={1}
              {...getFieldProps('username')}
              clear={true}
            >
              <CustomIcon type="user" style={iconStyle} />
            </InputItem>
            <InputItem
              type="password"
              placeholder="请输入密码"
              autoComplete='off'
              labelNumber={1}
              {...getFieldProps('password')}
              clear={true}
              onKeyPress={this.handleKeyPress}
            >
              <CustomIcon type="password" style={iconStyle} />
            </InputItem>
          </List>
          <Button
            type="primary"
            loading={loading}
            style={{ margin: '32px 4px' }}
            onClick={this.handleSubmit}
          >
            登录
          </Button>
        </Paper>
      </div>
    );
  }
}

export default connect(
  ({ login, loading }: ConnectState) => ({
    login,
    loading: loading.effects['login/login'],
  })
)(createForm()(Login));
