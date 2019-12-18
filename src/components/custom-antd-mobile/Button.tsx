import React from 'react';
import { Button } from 'antd-mobile';
import { ButtonProps } from 'antd-mobile/lib/button';

export interface CustomButtonProps extends ButtonProps {
  children?: any;
}

export default function CustomButton(props: CustomButtonProps) {
  const { style, children, ...rest } = props;
  return (
    <Button {...rest} style={{ ...style, borderRadius: 16 }}>
      {children}
    </Button>
  );
}
