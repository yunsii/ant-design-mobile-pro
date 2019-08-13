import React from 'react';
import { List, InputItem } from 'antd-mobile';
import Paper from '@/components/Paper';
import CustomIcon from '@/components/CustomIcon';
import { Button } from '@/components/CustomAntdMobile';
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

export default class extends React.PureComponent {
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


    return (
      <div style={{ marginTop: 'calc(50vh - 180px)' }}>
        <Paper icon={icon}>
          <List style={{ marginTop: 32 }}>
            <InputItem
              placeholder="请输入帐号"
              autoComplete='off'
              labelNumber={1}
            >
              <CustomIcon type="user" style={iconStyle} />
            </InputItem>
            <InputItem
              type="password"
              placeholder="请输入密码"
              autoComplete='off'
              labelNumber={1}
            >
              <CustomIcon type="password" style={iconStyle} />
            </InputItem>
          </List>
          <Button type="primary" style={{ margin: '32px 4px' }}>
            登录
          </Button>
        </Paper>
      </div>
    );
  }
}
