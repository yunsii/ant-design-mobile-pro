// @flow 
import * as React from 'react';
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
      <p style={style}>{title}</p>
      <p style={style}>{value}</p>
    </div>
  );
};

export default Statistics;
