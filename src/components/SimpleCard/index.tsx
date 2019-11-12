import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

export interface SimpleCardProps {
  title: string;
  extra?: any;
  children: React.ReactChildren | React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default (props: SimpleCardProps) => {
  const { title, extra, style, className, children } = props;
  return (
    <div style={style} className={classNames(styles.wrapper, className)}>
      <div className={styles.header}>
        <div className={styles.title}>
          {title}
        </div>
        <div className={styles.extra}>
          {extra}
        </div>
      </div>
      <div className={styles.body}>
        {children}
      </div>
    </div>
  )
}
