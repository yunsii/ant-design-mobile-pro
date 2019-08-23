import React from 'react';
import { List, InputItem, Toast } from 'antd-mobile';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import Paper from '@/components/Paper';
import Form from '@/components/Form';
import CustomIcon from '@/components/CustomIcon';
import { Button } from '@/components/CustomAntdMobile';
import { Dispatch, ConnectState } from '@/models/connect';
import styles from './Login.less';

const logo = '/logo.svg';
const iconStyle = { fontSize: '.48rem', color: '#776e6e' };

const setItems = (form, config) => {
  // const { getFieldProps } = form;
  const { handleKeyPress } = config;
  return [
    {
      fieldName: 'username',
      inputItemProps: {
        label: <CustomIcon type="user" style={iconStyle} />,
        placeholder: "请输入帐号：admin",
        autoComplete: 'off',
        labelNumber: 1,
      },
      fieldProps: {
        rules: [
          {
            required: true, message: '请输入姓名',
          }
        ],
      }
    },
    {
      fieldName: 'password',
      inputItemProps: {
        label: <CustomIcon type="password" style={iconStyle} />,
        type: "password",
        placeholder: "请输入密码：password",
        autoComplete: 'off',
        labelNumber: 1,
        onKeyPress: handleKeyPress
      },
      fieldProps: {
        rules: [
          {
            required: true, message: '请选择性别',
          }
        ],
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
      <div style={{ marginTop: '4rem', padding: '0 .32rem' }}>
        <Paper icon={icon}>
          <Form
            style={{ marginTop: '.64rem' }}
            form={form}
            items={setItems(form, { handleKeyPress: this.handleKeyPress })}
            onSubmit={this.handleSubmit}
            inListButton={false}
            buttonProps={{
              loading,
              style: { margin: '.64rem 0.08rem' }
            }}
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
