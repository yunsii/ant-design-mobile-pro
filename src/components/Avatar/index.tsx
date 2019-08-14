// @flow 
import * as React from 'react';
import classNames from 'classnames';
import styles from './index.less';

function setSizeClassName(size) {
  if (size === 'large') {
    return styles.avatarSizeLarge;
  }
  if (size === 'small') {
    return styles.avatarSizeSmall;
  }
  return styles.avatarSizeDefault;
}

function setShapeClassName(shape) {
  if (shape === 'square') {
    return styles.avatarShapeSquare;
  }
  return styles.avatarShapeCircle;
}

type Props = {
  src: string;
  size?: number | 'large' | 'small' | 'default';
  shape?: 'circle' | 'square';
  alt?: string;
  onError?: () => void;
  style?: React.CSSProperties;
};
const Avatar = (props: Props) => {
  const { src, size, shape, alt, onError, style } = props;
  const sizeStyle: React.CSSProperties =
    typeof size === 'number'
      ? {
        width: size,
        height: size,
        lineHeight: `${size}px`,
        fontSize: 18,
      }
      : {};
  return (
    <span style={style}>
      <img
        src={src}
        alt={alt}
        style={sizeStyle}
        className={classNames(typeof size !== 'number' ? setSizeClassName(size) : '', setShapeClassName(shape))}
        onError={onError}
      />
    </span>
  );
};

Avatar.defaultProps = {
  size: 'default',
  shape: 'circle',
  alt: '',
}

export default Avatar;
