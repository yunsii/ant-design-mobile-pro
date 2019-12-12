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
  labelClassName?: string;
  className?: string;
}

export default (props: DescriptionProps) => {
  const {
    label,
    children,
    gutter = 32,
    layout = 'horizontal',
    style,
    className,
    labelClassName,
    ...rest
  } = props;

  const isVertical = layout === 'vertical';

  return (
    <p
      className={classNames(styles.description, className)}
      style={{
        paddingLeft: pxToRem(gutter / 2),
        paddingRight: pxToRem(gutter / 2),
        ...style,
      }}
      {...rest}
    >
      <span className={classNames(styles.label, isVertical && styles.labelVertical, labelClassName)}>
        {label}
      </span>
      <span className={classNames(styles.text, isVertical && styles.textVertical)}>
        {children || '-'}
      </span>
    </p>
  )
}
