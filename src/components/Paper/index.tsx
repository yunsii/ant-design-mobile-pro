import React from 'react';
import styles from './index.less';

export interface PaperProps {
  full?: boolean;
  icon?: React.ReactNode;
  children?: any;
}

export default function Paper(props: PaperProps) {
  const { children, full, icon } = props;
  let style = {};
  if (full) {
    style = { ...style, borderRadius: 0, margin: 0 };
  }

  let renderIcon = null;
  if (icon) {
    renderIcon = <div className={styles.icon}>{icon}</div>;
    style = {
      ...style,

      marginTop: 30,
      paddingTop: 30,
    };
  }
  return (
    <div className={styles.paper} style={style}>
      {renderIcon}
      {children}
    </div>
  );
}
