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
  className?: string;
  bordered?: boolean;
};
const Avatar = (props: Props) => {
  const { src, size, shape, alt, onError, style, className, bordered } = props;
  const sizeStyle: React.CSSProperties =
    typeof size === 'number'
      ? {
        width: `${size / 100}rem`,
        height: `${size / 100}rem`,
        lineHeight: `${size / 100}rem`,
      }
      : {};
  const borderStyle: React.CSSProperties =
    bordered
      ? {
        border: '.01rem solid #dfdfdf',
        borderRadius: '.06rem',
      }
      : {};
  return (
    <span style={style} className={className}>
      <img
        src={src}
        alt={alt}
        style={{ ...sizeStyle, ...borderStyle }}
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
  bordered: false,
}

export default Avatar;
