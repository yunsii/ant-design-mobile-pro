import React from 'react';
import { Toast, Button } from 'antd-mobile';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import Paper from '@/components/Paper';
import Form from '@/components/Form';
import { ItemConfig } from '@/components/Form/Props';
import CustomIcon from '@/components/CustomIcon';
import { Dispatch, ConnectState } from '@/models/connect';
import styles from './Login.less';
const defaultSettings = require('@/defaultSettings');

const { publicPath } = defaultSettings;

const logo = `${publicPath}logo.svg`;
const iconStyle = { fontSize: '.48rem', color: '#776e6e' };

const setItems: (form: any, config: any) => ItemConfig[] = (form, config) => {
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
            buttonText={null}
            errorsFooter={false}
            hideRequiredMark
          />
          <Button
            type='primary'
            style={{ margin: '.64rem 0.08rem' }}
            loading={loading}
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
