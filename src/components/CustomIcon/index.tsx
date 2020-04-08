import * as React from 'react';
import classNames from 'classnames';
import { pxToRem } from '@/utils/customUtils';

type Props = {
  type: string;
  size?: number;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
};
const CustomIcon: React.FC<Props> = props => {
  const { type, className, style, size, ...rest } = props;

  const setStyle = () => {
    return size
      ? {
          width: pxToRem(size),
          height: pxToRem(size),
        }
      : {};
  };

  return (
    <svg
      className={classNames('icon', className)}
      aria-hidden='true'
      style={{ ...setStyle(), ...style }}
      {...rest}
    >
      <use xlinkHref={`#icon-${type}`} />
    </svg>
  );
};

export default CustomIcon;
