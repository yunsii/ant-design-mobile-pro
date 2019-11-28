import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

export interface ParagraphProps {
  children?: any;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  style?: React.CSSProperties;
  className?: string;
}

export default function Paper(props: ParagraphProps) {
  const { children, size = 'sm', className, ...rest } = props;
  return (
    <p className={classNames(styles.p, styles[size], className)} {...rest}>{children}</p>
  );
}
