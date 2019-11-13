import React, { useContext } from 'react';
import { List, Toast, InputItem, Picker, Button } from 'antd-mobile';
import _values from 'lodash/values';
import { ButtonProps } from 'antd-mobile/lib/button'
import { InputItemProps } from 'antd-mobile/lib/input-item'
import { PickerPropsType } from 'antd-mobile/lib/picker/PropsType'
import FormContext, { FormProvider } from './FormContext';

export type ComponentType =
  | "custom"
  | "picker"
  | "string"

export type ComponentProps =
  | InputItemProps & { label?: any }
  | PickerPropsType & { label?: any }

const setComponent = (form: any) => (
  type: ComponentType,
  label: any,
  field: string,
  {
    componentProps,
    component,
  }: {
    componentProps?: any,
    component?: any,
  }) => {
  const { setFieldsValue } = form;
  if (type === 'custom') {
    return component;
  } else if (type === 'picker') {
    return (
      <Picker
        cols={1}
        dismissText='重置'
        onDismiss={() => { setFieldsValue({ [field]: undefined }) }}
        {...componentProps}
      >
        <List.Item arrow="horizontal">{label}</List.Item>
      </Picker>
    )
  } else {
    return (
      <InputItem
        placeholder='请输入'
        clear
        {...componentProps}
      >
        {label}
      </InputItem>
    )
  }
}

export interface FormItem {
  type?: ComponentType,
  label?: any,
  field: string,
  componentProps?: ComponentProps,
  fieldProps?: any,
  component?: React.ReactNode,
}

export interface FormProps {
  header?: any;
  items: FormItem[];
  errorsFooter?: boolean;
  onSubmit?: (fieldsValue: any) => void;
  buttonText?: string | null;
  buttonProps?: ButtonProps;
  style?: React.CSSProperties;
}

function Form(props: FormProps) {
  const {
    header,
    items,
    errorsFooter = true,
    onSubmit,
    style,
    buttonText = '确定',
    buttonProps,
  } = props;
  const form = useContext(FormContext);
  const { getFieldsError } = form;

  const setFormItems = (_items: FormItem[]) => {
    const { getFieldProps, getFieldError } = form;
    return _items.map(item => {
      const { type = 'string', label, field, componentProps, component, fieldProps } = item;

      const error = getFieldError(field);
      const errorProps = error ? {
        error,
        onErrorClick: () => Toast.info(error[0]),
      } : {};

      const _fieldProps = type !== 'custom' ? {
        ...getFieldProps(field, fieldProps || undefined),
      } : {};

      return (
        React.cloneElement(
          setComponent(form)(type, label, field, { componentProps, component }),
          {
            key: field,
            ..._fieldProps,
            ...errorProps,
          }
        )
      );
    });
  }

  const handleClick = () => {
    if (form) {
      form.validateFields((err?: any[], values?: any) => {
        if (process.env.NODE_ENV !== 'production') {
          console.log('form err:', err);
          console.log('form values', values);
        }
        if (err) { return }
        if (onSubmit) { onSubmit(values) }
      });
    }
  }

  const renderButton = () => {
    return (
      <Button
        type='primary'
        onClick={handleClick}
        {...buttonProps}
      >
        {buttonText}
      </Button>
    )
  }

  const listProps: any = {};
  if (header) { listProps.renderHeader = () => header; }

  const errors = _values(getFieldsError(items.map(item => item.field))).filter(item => item);
  if (errorsFooter && errors.length) {
    listProps.renderFooter = () => <span style={{ color: '#ff5f0f' }}>{errors.join('，')}</span>;
  }

  return (
    <>
      <List style={style} {...listProps}>
        {setFormItems(items)}
        {buttonText ?
          <List.Item>
            {renderButton()}
          </List.Item> : null}
      </List>
    </>
  )
}

export interface Props extends FormProps {
  form: any;
}

export default ({ form, ...rest }: Props) => (
  <FormProvider value={form}>
    <Form {...rest} />
  </FormProvider>
);
