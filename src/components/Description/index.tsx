import React from 'react';
import classNames from 'classnames';
import { pxToRem } from '@/utils/customUtils'
import styles from './index.less';

export type DescriptionLayout = 'horizontal' | 'vertical';

export interface DescriptionProps extends React.Attributes {
  label: string;
  children: React.ReactNode;
  gutter?: number;
  layout?: DescriptionLayout;
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  labelClassName?: string;
  textClassName?: string;
  className?: string;
}

export default (props: DescriptionProps) => {
  const {
    label,
    children,
    gutter = 32,
    layout = 'horizontal',
    style,
    labelStyle,
    textStyle,
    className,
    labelClassName,
    textClassName,
    ...rest
  } = props;

  const isVertical = layout === 'vertical';

  const containerCls = classNames(styles.description, className);
  const lableCls = classNames(classNames(styles.label, isVertical && styles.labelVertical, labelClassName));
  const textCls = classNames(styles.text, isVertical && styles.textVertical, textClassName);
  
  return (
    <p
      className={containerCls}
      style={{
        paddingLeft: pxToRem(gutter / 2),
        paddingRight: pxToRem(gutter / 2),
        ...style,
      }}
      {...rest}
    >
      <span
        className={lableCls}
        style={labelStyle}
      >
        {label}
      </span>
      <span
        className={textCls}
        style={textStyle}
      >
        {children || '-'}
      </span>
    </p>
  )
}
