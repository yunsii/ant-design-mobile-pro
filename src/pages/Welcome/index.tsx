import React, { Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Grid, Button, Flex } from 'antd-mobile';
import Avatar from '@/components/Avatar';
import Paper from '@/components/Paper';
import Statistics from '@/components/Statistics';
import CustomIcon from '@/components/CustomIcon';
import { Dispatch } from '@/models/connect';
import styles from './index.less';

// const data = Array.from(new Array(9)).map((_val, i) => ({
//   icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
//   text: `name${i}`,
// }));

const MenuIcon = (props) => {
  const { type, color } = props;
  return <CustomIcon type={type.split('-')[1]} size={60} style={{ color }} />
}

const statistics = [
  {
    key: 'all',
    title: (
      <Fragment>
        <MenuIcon type='icon-all' color='#3aceee' /><br />
        <p>
          总数量
        </p>
      </Fragment>
    ),
    value: 45,
    align: 'center',
  },
  {
    key: 'lack',
    title: (
      <Fragment>
        <MenuIcon type='icon-empty' color='#3aceee' /><br />
        <p>
          －－－－
        </p>
      </Fragment>
    ),
    value: 12,
    align: 'center',
  },
  {
    key: 'online',
    title: (
      <Fragment>
        <MenuIcon type='icon-empty' color='#3aceee' /><br />
        <p>
          －－－－
        </p>
      </Fragment>
    ),
    value: 2,
    align: 'center',
  },
  {
    key: 'offline',
    title: (
      <Fragment>
        <MenuIcon type='icon-empty' color='#3aceee' /><br />
        <p>
          －－－－
        </p>
      </Fragment>
    ),
    value: 18,
    align: 'center',
  },
]

const menuItems = [
  {
    icon: <MenuIcon type='icon-list' color='#f37a3f' />,
    text: '长列表',
    link: '/demo/standard-list'
  },
  {
    icon: <MenuIcon type='icon-form' color='#4fdde6' />,
    text: '表单',
    link: '/demo/form',
  },
  {
    icon: <MenuIcon type='icon-map' color='#8ad939' />,
    text: '高德地图',
    link: '/demo/amap',
  },
  {
    icon: <MenuIcon type='icon-star' color='#ae93e7' />,
    text: 'Avatar',
    link: '/demo/avatar',
  },
  {
    icon: <MenuIcon type='icon-empty' color='#43e7ae' />,
    text: '－－－－',
  },
  {
    icon: <MenuIcon type='icon-empty' color='#fda067' />,
    text: '－－－－',
  },
  {
    icon: <MenuIcon type='icon-empty' color='#ffb611' />,
    text: '－－－－',
  },
  {
    icon: <MenuIcon type='icon-empty' color='#57e0e2' />,
    text: '－－－－',
  },
];

export interface CenterProps {
  dispatch: Dispatch;
}

class Welcome extends React.PureComponent<CenterProps> {
  state = {
    data: ['1', '2', '3'],
  }

  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
  }

  handleExit = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/logout',
    })
  }

  handleClick = (item) => {
    if (item.link) {
      router.push(item.link);
    }
  }

  render() {
    return (
      <div className={styles.hero}>
        <header className={styles.header}>
          <div className={styles.userInfo}>
            <Avatar
              src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              shape='square'
              size={100}
              style={{ border: '1px solid #dfdfdf' }}
            />
            <span className={styles.username}>admin</span>
            <span className={styles.lastLogin}>2019-8-14 09:47:07</span>
            <Button inline className={styles.updatePassword}>修改密码</Button>
            <Button inline className={styles.exit} onClick={this.handleExit}>退出</Button>
          </div>
        </header>
        <div className={styles.monitor}>
          <Paper clearPadding>
            <Flex justify='center' style={{ width: '100%', height: '100%', margin: '.2rem 0' }}>
              {statistics.map((item) => {
                return (
                  <Flex.Item key={item.key}>
                    <Statistics
                      title={item.title}
                      value={item.value}
                      align={item.align}
                    />
                  </Flex.Item>
                )
              })}
            </Flex>
          </Paper>
        </div>
        <Grid className={styles.menu} data={menuItems} hasLine={false} columnNum={3} onClick={this.handleClick} />
      </div>
    );
  }
}

export default connect()(Welcome);
