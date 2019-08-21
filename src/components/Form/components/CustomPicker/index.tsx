import React from 'react';
import { Picker } from 'antd-mobile';
import { PickerPropsType } from 'antd-mobile/lib/picker/PropsType';

export interface CustomPickerProps extends PickerPropsType {
  error?: any[],
  onErrorClick?: () => void,
  children?: any,
}

function CustomPicker(props: CustomPickerProps, ref: any) {
  const { error, onErrorClick, ...rest } = props;
  const errorProps = error ? {
    extra: <span style={{ color: '#ff5500' }}>{error[0]}</span> as any,
  } : {};
  return (
    <Picker cols={1} {...rest} {...errorProps} ref={ref} />
  )
}

export default React.forwardRef(CustomPicker);
