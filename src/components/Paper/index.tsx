import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

const colors: any = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
];

export interface PaperProps {
  full?: boolean;
  icon?: React.ReactNode;
  color?: 'pink' | 'red' | 'yellow' | 'orange' | 'cyan' | 'green' | 'blue' | 'purple' | 'geekblue' | 'magenta' | 'volcano' | 'gold' | 'lime' | string;
  children?: any;
  /** paper wrapper className */
  clearPadding?: boolean;
  onClick?: () => void;
}

export default function Paper(props: PaperProps) {
  const { children, full, icon, clearPadding, color, ...rest } = props;

  const setRenderIcon = () => icon && <div className={styles.icon}>{icon}</div>;

  const setStyle = () => {
    let style: React.CSSProperties = {};
    if (full) {
      style = { ...style, borderRadius: 0, margin: 0 };
    }
    if (setRenderIcon()) {
      style = {
        ...style,
        marginTop: '.3rem',
        paddingTop: '1rem',
      };
    }
    if (clearPadding) {
      style = {
        ...style,
        paddingLeft: 0,
        paddingRight: 0,
      }
    }
    if (!colors.includes(color)) {
      style = {
        ...style,
        background: color,
      }
    }
    return style;
  }

  return (
    <div
      {...rest}
      className={classNames(styles.paper, colors.includes(color) ? styles[`paper-color-${color}`] : '')}
      style={setStyle()}
    >
      {setRenderIcon()}
      {children}
    </div>
  );
}
