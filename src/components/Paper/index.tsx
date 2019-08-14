import React from 'react';
import styles from './index.less';

export interface PaperProps {
  full?: boolean;
  icon?: React.ReactNode;
  children?: any;
  /** paper wrapper className */
  clearPadding?: boolean;
}

export default function Paper(props: PaperProps) {
  const { children, full, icon, clearPadding } = props;
  let style = {};
  if (full) {
    style = { ...style, borderRadius: 0, margin: 0 };
  }

  let renderIcon: any = null;
  if (icon) {
    renderIcon = <div className={styles.icon}>{icon}</div>;
    style = {
      ...style,

      marginTop: 30,
      paddingTop: 48,
    };
  }
  if (clearPadding) {
    style = {
      ...style,

      paddingLeft: 0,
      paddingRight: 0,
    }
  }
  return (
    <div className={styles.paper} style={style}>
      {renderIcon}
      {children}
    </div>
  );
}
