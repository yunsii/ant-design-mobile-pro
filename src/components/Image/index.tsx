import React from 'react';
import styles from './index.less';
import classNames from 'classnames';

export interface ImageProps extends React.HTMLAttributes<any> {
  src?: string;
}

const Image: React.FC<ImageProps> = (props) => {
  const { src, className, ...rest } = props;

  return (
    <div className={classNames(styles.imgWrapper, className)} {...rest}>
      <img
        src={src}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </div>
  );
}

export default Image;
