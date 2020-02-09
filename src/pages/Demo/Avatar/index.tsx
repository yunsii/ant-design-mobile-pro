import React from 'react';
import { Grid } from 'antd-mobile';
import PageWrapper from '@/components/PageWrapper';
import CustomIcon from '@/components/CustomIcon';
import Avatar from '@/components/Avatar';

const data = [
  {
    icon: <Avatar size='large' icon="user" />,
  },
  {
    icon: <Avatar size='large' icon={<CustomIcon type="empty" />} />,
  },
  {
    icon: <Avatar size='large'>U</Avatar>,
  },
  {
    icon: <Avatar size='large'>USER</Avatar>,
  },
  {
    icon: <Avatar size='large' src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />,
  },
  {
    icon: <Avatar size='large' style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>,
  },
  {
    icon: <Avatar size='large' style={{ backgroundColor: '#87d068' }} icon="user" />,
  },
]

class AvatarDemo extends React.PureComponent<any> {
  render() {
    return (
      <PageWrapper title='表单' backable>
        <Grid
          data={data}
          square={false}
        />
      </PageWrapper>
    );
  }
}

export default AvatarDemo;
