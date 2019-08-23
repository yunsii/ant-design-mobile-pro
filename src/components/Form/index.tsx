import React, { useContext } from 'react';
import { List, Toast, InputItem, Picker } from 'antd-mobile';
import { Button } from '@/components/CustomAntdMobile';
import { CustomButtonProps } from '@/components/CustomAntdMobile/Button';
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
  buttonProps?: CustomButtonProps;
  style?: React.CSSProperties;
}

function Form(props: FormProps) {
  const {
    header,
    footer,
    items,
    onSubmit,
    style,
    inListButton,
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
        确定
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
        {inListButton && onSubmit ?
          <List.Item>
            {renderButton()}
          </List.Item> : null}
      </List>
      {!inListButton && onSubmit ? renderButton() : null}
    </>
  )
}

Form.defaultProps = {
  inListButton: true,
}

export interface Props extends FormProps {
  form: any;
}

export default ({ form, ...rest }: Props) => (
  <FormProvider value={form}>
    <Form {...rest} />
  </FormProvider>
);
