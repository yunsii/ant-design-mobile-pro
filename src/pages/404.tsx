import { Result } from 'antd-mobile';
import React from 'react';
import router from 'umi/router';

const NoFoundPage: React.FC<{}> = () => (
  <Result
    title="404"
    message="Sorry, the page you visited does not exist."
    buttonText="Back Home"
    buttonType="primary"
    onButtonClick={() => router.push('/')}
  />
);

export default NoFoundPage;
