// @flow 
import * as React from 'react';
import styles from './index.less';

type Props = {
  title: any;
  value: any;
  align?: string;
  className?: string;
};
const Statistics = (props: Props) => {
  const { title, value, align, className } = props;

  let style: React.CSSProperties = {};
  if (align === 'center') {
    style = { textAlign: 'center' };
  }
  return (
    <div className={className}>
      <div className={styles.item} style={style}>{title}</div>
      <p className={styles.value} style={style}>{value || '-'}</p>
    </div>
  );
};

export default Statistics;
