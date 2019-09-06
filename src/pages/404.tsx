import { Result, Icon } from 'antd-mobile';
import React from 'react';
import router from 'umi/router';

const NoFoundPage: React.FC<{}> = () => (
  <Result
    img={<Icon type="cross-circle-o" className="spe" style={{ fill: '#F13642', width: 60, height: 60 }} />}
    title="404"
    message="Sorry, the page you visited does not exist."
    buttonText="Back Home"
    buttonType="primary"
    onButtonClick={() => router.push('/')}
    style={{ height: '100vh', paddingTop: 'calc(50vh - 3rem)' }}
  />
);

export default NoFoundPage;
