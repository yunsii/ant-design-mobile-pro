import React, { useContext } from 'react';
import { List, InputItem, Picker, Button, TextareaItem } from 'antd-mobile';
import _values from 'lodash/values';
import { ButtonProps } from 'antd-mobile/lib/button'
import { InputItemProps } from 'antd-mobile/lib/input-item'
import { TextareaItemProps } from 'antd-mobile/lib/textarea-item'
import { PickerPropsType } from 'antd-mobile/lib/picker/PropsType'
import FormContext, { FormProvider } from './FormContext';
import CustomImagePicker, { ImagePickerProps } from './components/CustomImagePicker';

export type ComponentType =
  | "custom"
  | "picker"
  | "picture"
  | "textarea"
  | "string"

export type ComponentProps =
  | PickerPropsType
  | ImagePickerProps
  | TextareaItemProps
  | InputItemProps

const renderInputComponent = (form: any) => (
  type: ComponentType,
  label: any,
  field: string,
  componentProps: any,
) => {
  const { setFieldsValue } = form;
  switch (type) {
    case 'picker':
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
    case 'picture':
      const WrappedImagePicker = React.forwardRef((props, ref) => {
        return (
          <List.Item>
            <p style={{ margin: 0 }}>{label}</p>
            <CustomImagePicker
              onImageClick={(index, fs) => console.log(index, fs)}
              {...props}
              ref={ref as any}
            />
          </List.Item>
        )
      })
      return <WrappedImagePicker />
    case 'textarea':
      return <TextareaItem title={label} />
    case 'string':
    default:
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

const setValuePropName = (type: ComponentType) => {
  if (type === "picture") {
    return "files";
  }
  return "value";
};

export interface ItemConfig {
  type?: ComponentType,
  field: string,
  label?: any,
  componentProps?: ComponentProps,
  fieldProps?: {
    initialValue?: any,
    rules?: any,
    valuePropName?: any,
    normalize?: (value: any, prevValue: any, allValues: any) => any,
    trigger?: string,
    validateFirst?: boolean,
    validateTrigger?: string | string[],
  },
  component?: JSX.Element,
}

export interface FormProps {
  header?: any;
  items: ItemConfig[];
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

  const setFormItems = (_items: ItemConfig[]) => {
    const { getFieldProps } = form;
    return _items.map(item => {
      const { type = 'string', label, field, componentProps, component, fieldProps } = item;

      // const error = getFieldError(field);
      // const errorProps = error ? {
      //   error,
      //   onErrorClick: () => Toast.info(error[0]),
      // } : {};

      const _fieldProps = type !== 'custom' ? {
        ...getFieldProps(
          field,
          {
            valuePropName: setValuePropName(type),
            ...fieldProps,
          }
        ),
      } : {};

      return type === 'custom' && component ? React.cloneElement(component, { key: field }) : (
        React.cloneElement(
          renderInputComponent(form)(type, label, field, componentProps),
          {
            ...componentProps as any,
            ..._fieldProps,
            key: field,
          }
        )
      )
    }).filter(item => item) as JSX.Element[];
  }

  const handleClick = () => {
    if (form) {
      form.validateFields((err?: { [k: string]: { errors: any[] } }, values?: any) => {
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
