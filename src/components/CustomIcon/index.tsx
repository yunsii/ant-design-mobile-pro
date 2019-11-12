import * as React from 'react';
import classNames from 'classnames';
import styles from './index.less';

type Props = {
  type: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
};
const CustomIcon = (props: Props) => {
  const { type, className, ...rest } = props;
  return (
    <svg className={classNames(styles.icon, className)} aria-hidden="true" {...rest}>
      <use xlinkHref={`#icon-${type}`} />
    </svg>
  );
};

export default CustomIcon;
