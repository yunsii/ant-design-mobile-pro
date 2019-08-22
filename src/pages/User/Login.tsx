import React from 'react';
import { List, InputItem, Toast } from 'antd-mobile';
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
  width: '1.24rem',
  padding: '.36rem',
  boxSizing: 'content-box',
  backgroundColor: 'white',
  borderRadius: '50%',
  zIndex: 10,
  // backgroundImage: `url(${logo})`,
  // backgroundSize: '48px 48px',
}

const iconStyle = { fontSize: '.48rem', color: '#776e6e' };

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
      console.log(err, values);
      if (err) {
        Toast.info('请输入正确的帐号密码', 2, undefined, false);
        return;
      };
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
          src={logo}
          alt=""
          style={logoStyle as any}
        />
      </div>
    );
    const { form: { getFieldProps }, loading } = this.props;

    return (
      <div style={{ marginTop: '4rem', padding: '0 .32rem' }}>
        <Paper icon={icon}>
          <List style={{ marginTop: '.64rem' }}>
            <InputItem
              placeholder="请输入帐号：admin"
              autoComplete='off'
              labelNumber={1}
              {...getFieldProps('username', {
                rules: [{
                  required: true,
                  message: '请输入帐号',
                }],
              })}
              clear={true}
            >
              <CustomIcon type="user" style={iconStyle} />
            </InputItem>
            <InputItem
              type="password"
              placeholder="请输入密码：password"
              autoComplete='off'
              labelNumber={1}
              {...getFieldProps('password', {
                rules: [{
                  required: true,
                  message: '请输入密码',
                }],
              })}
              clear={true}
              onKeyPress={this.handleKeyPress}
            >
              <CustomIcon type="password" style={iconStyle} />
            </InputItem>
          </List>
          <Button
            type="primary"
            loading={loading}
            style={{ margin: '.64rem .08rem' }}
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
