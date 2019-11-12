import React, { useContext } from 'react';
import { List, Toast, InputItem, Picker, Button } from 'antd-mobile';
import { ButtonProps } from 'antd-mobile/lib/button'
import FormContext, { FormProvider } from './FormContext';

function judgeComponent(type, inputItemProps = {} as any, component, { form, fieldName }: { form: any, fieldName: string }) {
  const { setFieldsValue } = form;
  const { label, ...rest } = inputItemProps;
  if (type === 'custom') {
    return component;
  } else if (type === 'picker') {
    return (
      <Picker
        cols={1}
        dismissText='重置'
        onDismiss={() => { setFieldsValue({ [fieldName]: undefined }) }}
        {...rest}
      >
        <List.Item arrow="horizontal">{label}</List.Item>
      </Picker>
    )
  } else {
    return (
      <InputItem
        placeholder='请输入'
        clear
        {...rest}
      >
        {label}
      </InputItem>
    )
  }
}

export interface FormProps {
  header?: any;
  footer?: any;
  items: {
    type?: string,
    fieldName: string,
    inputItemProps?: any,
    fieldProps?: any,
    component?: React.ReactElement,
  }[];
  onSubmit?: (fieldsValue: any) => void;
  inListButton?: boolean;
  buttonText?: string;
  buttonProps?: ButtonProps;
  style?: React.CSSProperties;
}

function Form(props: FormProps) {
  const {
    header,
    footer,
    items,
    onSubmit,
    style,
    inListButton = true,
    buttonText = '确定',
    buttonProps,
  } = props;
  const form = useContext(FormContext);

  const setFormItems = (_items: any) => {
    const { getFieldProps, getFieldError } = form;
    return _items.map(item => {
      const { type, fieldName, inputItemProps, component, fieldProps } = item;

      const error = getFieldError(fieldName);
      const errorProps = error ? {
        error,
        onErrorClick: () => Toast.info(error[0]),
      } : {};

      const _fieldProps = type !== 'custom' ? {
        ...getFieldProps(fieldName, fieldProps || undefined),
      } : {};

      return (
        React.cloneElement(
          judgeComponent(type, inputItemProps, component, { form, fieldName }),
          {
            key: fieldName,
            ..._fieldProps,
            ...errorProps,
          }
        )
      );
    });
  }

  const handleClick = () => {
    if (form) {
      form.validateFields((err, values) => {
        if (process.env.NODE_ENV !== 'production') {
          console.log('form err:', err);
          console.log('form values', values);
        }
        if (err) {
          Toast.fail(err[Object.keys(err)[0]].errors[0].message);
          return;
        }
        if (onSubmit) { onSubmit(values) };
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
  if (footer) { listProps.renderFooter = () => footer; }

  return (
    <>
      <List style={style} {...listProps}>
        {setFormItems(items)}
        {inListButton ?
          <List.Item>
            {renderButton()}
          </List.Item> : renderButton()}
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
