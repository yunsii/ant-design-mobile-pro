import React from 'react';
import { Toast } from 'antd-mobile';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import Paper from '@/components/Paper';
import Form, { FormItem } from '@/components/Form';
import CustomIcon from '@/components/CustomIcon';
import { Dispatch, ConnectState } from '@/models/connect';
import styles from './Login.less';

const logo = '/logo.svg';
const iconStyle = { fontSize: '.48rem', color: '#776e6e' };

const setItems: (form: any, config: any) => FormItem[] = (form, config) => {
  const { handleKeyPress } = config;
  return [
    {
      field: 'username',
      label: <CustomIcon type="user" style={iconStyle} />,
      fieldProps: {
        rules: [
          {
            required: true, message: '请输入姓名',
          }
        ],
      },
      componentProps: {
        placeholder: "请输入帐号：admin",
        autoComplete: 'off',
        labelNumber: 1,
      },
    },
    {
      field: 'password',
      label: <CustomIcon type="password" style={iconStyle} />,
      fieldProps: {
        rules: [
          {
            required: true, message: '请输入密码',
          }
        ],
      },
      componentProps: {
        type: "password",
        placeholder: "请输入密码：password",
        autoComplete: 'off',
        labelNumber: 1,
        onKeyPress: handleKeyPress
      },
    },
  ];
}

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
        />
      </div>
    );
    const { form, loading } = this.props;

    return (
      <div className={styles.wrapper}>
        <Paper icon={icon}>
          <Form
            style={{ marginTop: '.64rem' }}
            form={form}
            items={setItems(form, { handleKeyPress: this.handleKeyPress })}
            onSubmit={this.handleSubmit}
            buttonText='登录'
            buttonProps={{
              loading,
              style: { margin: '.64rem 0.08rem' }
            }}
            errorsFooter={false}
          />
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
