// @flow 
import * as React from 'react';
import styles from './index.less';

type Props = {
  title: any;
  value: number;
  align?: string;
};
const Statistics = (props: Props) => {
  const { title, value, align } = props;

  let style: React.CSSProperties = {};
  if (align === 'center') {
    style = { textAlign: 'center' };
  }
  return (
    <div>
      <div className={styles.item} style={style}>{title}</div>
      <p style={style}>{value}</p>
    </div>
  );
};

export default Statistics;
