import React from 'react';
import { Result } from 'antd-mobile';
import { ResultProps } from 'antd-mobile/lib/result'
import _repeat from 'lodash/repeat';

export const CustomResult: React.FC<ResultProps> = ({...props}) => {
  return <Result style={{ border: 'unset' }} {...props} />
}

export default CustomResult;
