// @flow 
import * as React from 'react';
type Props = {
  type: string;
  style?: React.CSSProperties;
};
const CustomIcon = (props: Props) => {
  const { type, ...rest } = props;
  return (
    <svg className="icon" aria-hidden="true" {...rest}>
      <use xlinkHref={`#icon-${type}`}/>
    </svg>
  );
};

export default CustomIcon;
