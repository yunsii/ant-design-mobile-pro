import React from 'react';
import { Result } from 'antd-mobile';
import { ResultProps } from 'antd-mobile/lib/result';
import classNames from 'classnames';
import styles from './index.less';

export const CustomResult: React.FC<ResultProps> = ({ className, ...rest }) => {
  return (
    <Result
      style={{ border: 'unset' }}
      className={classNames(!rest.title && styles.noTitle, className)}
      {...rest}
    />
  )
}

export default CustomResult;
