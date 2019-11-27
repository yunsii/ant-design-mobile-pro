import React, { useContext } from 'react';
import { List, InputItem, Picker, Button, TextareaItem, Toast, DatePicker } from 'antd-mobile';
import _values from 'lodash/values';
import _get from 'lodash/get';
import _find from 'lodash/find';
import { ButtonProps } from 'antd-mobile/lib/button'
import { InputItemProps } from 'antd-mobile/lib/input-item'
import { TextareaItemProps } from 'antd-mobile/lib/textarea-item'
import { PickerPropsType } from 'antd-mobile/lib/picker/PropsType'
import FormContext, { FormProvider } from './FormContext';
import CustomImagePicker, { ImagePickerProps } from './components/CustomImagePicker';
import styles from './index.less';

export interface WrappedImagePickerProps extends ImagePickerProps {
  extra?: string;
}

export type ComponentType =
  | "custom"
  | "picker"
  | "picture"
  | "date"
  | "time"
  | "datetime"
  | "textarea"
  | "string"

export type ComponentProps =
  | PickerPropsType
  | WrappedImagePickerProps
  | TextareaItemProps
  | InputItemProps

const renderInputComponent = (form: any) => (
  type: ComponentType,
  label: any,
  field: string,
  componentProps: any,
  component?: JSX.Element,
) => {
  const { setFieldsValue } = form;
  switch (type) {
    case 'custom':
      return component;
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
      const WrappedImagePicker = React.forwardRef((props: WrappedImagePickerProps, ref) => {
        const { extra, ...rest } = props;
        return (
          <List.Item>
            <p style={{ margin: 0 }}>{label}</p>
            <CustomImagePicker
              onImageClick={(index, fs) => console.log(index, fs)}
              {...rest}
              ref={ref as any}
            />
            <p className={styles['picture-extra']} style={{ margin: 0 }}>{extra}</p>
          </List.Item>
        )
      })
      return <WrappedImagePicker />
    case 'textarea':
      return <TextareaItem title={label} rows={2} placeholder='请输入' />
    case 'date':
    case 'time':
    case 'datetime':
      return <DatePicker mode={type}><List.Item arrow="horizontal">{label}</List.Item></DatePicker>
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
  items?: ItemConfig[];
  errorsFooter?: boolean;
  onSubmit?: (fieldsValue: any) => void;
  buttonText?: string | null;
  buttonProps?: ButtonProps;
  style?: React.CSSProperties;
  className?: string;
  footerErrors?: boolean;
  hideRequiredMark?: boolean;
}

function Form(props: FormProps) {
  const {
    header,
    items = [],
    errorsFooter = true,
    onSubmit,
    style,
    buttonText = '确定',
    buttonProps,
    footerErrors = true,
    className,
    hideRequiredMark = false,
  } = props;
  const form = useContext(FormContext);
  const { getFieldsError } = form;

  const setFormItems = (_items: ItemConfig[]) => {
    const { getFieldProps, getFieldError } = form;
    return _items.map(item => {
      const { type = 'string', label, field, componentProps, component, fieldProps } = item;

      const error = getFieldError(field);
      const errorProps = !footerErrors && error ? {
        error,
        onErrorClick: () => Toast.info(error[0]),
      } : {};

      const injectfieldProps = type !== 'custom' ? {
        ...getFieldProps(
          field,
          {
            valuePropName: setValuePropName(type),
            ...fieldProps,
          }
        ),
      } : {};

      const renderComponent = renderInputComponent(form)(
        type,
        label,
        field,
        componentProps,
        component,
      );

      const renderItem = renderComponent && (
        React.cloneElement(
          renderComponent,
          {
            ...componentProps as any,
            ...injectfieldProps,
            ...errorProps,
            key: field,
          }
        )
      )

      return !hideRequiredMark && !!_find(_get(fieldProps, 'rules', []), { required: true }) ? (
        <div key={field} className={styles.required}>
          {renderItem}
        </div>
      ) : renderItem;
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
  if (footerErrors && errorsFooter && errors.length) {
    listProps.renderFooter = () => <span className={styles['error-text']}>{errors.join('，')}</span>;
  }

  return (
    <>
      <List style={style} className={className} {...listProps}>
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
