import React, { Fragment } from 'react';
import { Grid, Button, Flex } from 'antd-mobile';
import Avatar from '@/components/Avatar';
import Paper from '@/components/Paper';
import Statistics from '@/components/Statistics';
import CustomIcon from '@/components/CustomIcon';
import styles from './index.less';

// const data = Array.from(new Array(9)).map((_val, i) => ({
//   icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
//   text: `name${i}`,
// }));

const MenuIcon = (props) => {
  const { type, color } = props;
  return <CustomIcon type={type.split('-')[1]} style={{ color, fontSize: '.4rem' }} />
}

const statistics = [
  {
    key: 'all',
    title: (
      <Fragment>
        <MenuIcon type='icon-quanbushebei' color='#3aceee' /><br />
        <p>
          全部设备
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
        <MenuIcon type='icon-quehuobuhuo' color='#3aceee' /><br />
        <p>
          缺货设备
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
        <MenuIcon type='icon-shebei1' color='#3aceee' /><br />
        <p>
          在线设备
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
        <MenuIcon type='icon-lixianshebeishu' color='#3aceee' /><br />
        <p>
          离线设备
        </p>
      </Fragment>
    ),
    value: 18,
    align: 'center',
  },
]

const menuItems = [
  {
    icon: <MenuIcon type='icon-shouhuoji' color='#f37a3f' />,
    text: '售货机',
  },
  {
    icon: <MenuIcon type='icon-lixianshebeishu' color='#4fdde6' />,
    text: '离线设备',
  },
  {
    icon: <MenuIcon type='icon-shebei' color='#8ad939' />,
    text: '设备详情',
  },
  {
    icon: <MenuIcon type='icon-baobiao' color='#ae93e7' />,
    text: '即时报表',
  },
  {
    icon: <MenuIcon type='icon-ribao' color='#ae93e7' />,
    text: '销售日报',
  },
  {
    icon: <MenuIcon type='icon-yuebao' color='#fda067' />,
    text: '销售月报',
  },
  {
    icon: <MenuIcon type='icon-ditu' color='#ffb611' />,
    text: '地图',
  },
  {
    icon: <MenuIcon type='icon-sao' color='#57e0e2' />,
    text: '扫一扫',
  },
];

export interface CenterProps {
  form: any;
  dispatch: any;
  login: any;
  loading: boolean;
}

export default class Center extends React.PureComponent<CenterProps> {
  state = {
    data: ['1', '2', '3'],
    imgHeight: 176,
  }

  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
  }

  render() {
    return (
      <div className={styles.hero}>
        <header className={styles.header}>
          <div className={styles.userInfo}>
            <Avatar
              src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              size={48}
              shape='square'
              style={{ marginLeft: 24 }}
              bordered
            />
            <span className={styles.username}>admin</span>
            <span className={styles.lastLogin}>2019-8-14 09:47:07</span>
            <Button inline className={styles.updatePassword}>修改密码</Button>
            <Button inline className={styles.exit}>退出</Button>
          </div>
        </header>
        <div className={styles.monitor}>
          <Paper clearPadding>
            <Flex justify='center' style={{ width: '100%', height: '100%'}}>
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
        <Grid className={styles.menu} data={menuItems} hasLine={false} columnNum={3} />
      </div>
    );
  }
}
