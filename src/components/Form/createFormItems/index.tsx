import React from 'react';
import { List, InputItem, Picker, TextareaItem, Toast, DatePicker } from 'antd-mobile';
import _values from 'lodash/values';
import _get from 'lodash/get';
import _find from 'lodash/find';
import { withProps } from '@/utils/reactUtils';
import CustomImagePicker from '../components/CustomImagePicker';
import {
  WrappedImagePickerProps,
  ComponentType,
  ItemConfig,
} from '../Props';
import styles from './index.less';

const WrappedImagePicker = React.forwardRef((props: WrappedImagePickerProps, ref) => {
  const { extra, label, ...rest } = props;
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
});

const setValuePropName = (type: ComponentType) => {
  switch (type) {
    case 'picture':
      return 'files';
    default:
      return 'value';
  }
};

const renderInputComponent = (form: any) => (
  type: ComponentType,
  label: any,
  field: string,
  componentProps: any,
  component?: JSX.Element,
) => {
  const { setFieldsValue } = form;
  const { disabled } = componentProps || {};

  const dismissProps = {
    dismissText: '重置',
    onDismiss: () => { setFieldsValue({ [field]: undefined }) },
  };

  switch (type) {
    case 'custom':
      return component;
    case 'picker':
      return (
        <Picker
          cols={1}
          {...dismissProps}
          {...componentProps}
        >
          <List.Item arrow="horizontal" disabled={disabled}>{label}</List.Item>
        </Picker>
      );
    case 'picture':
      return <WrappedImagePicker {...componentProps} label={label} />;
    case 'textarea':
      return <TextareaItem title={label} rows={2} placeholder='请输入' {...componentProps} />;
    case 'date':
    case 'time':
    case 'datetime':
      return (
        <DatePicker
          {...dismissProps}
          {...componentProps}
          mode={type}
        >
          <List.Item arrow="horizontal" disabled={disabled}>{label}</List.Item>
        </DatePicker>
      );
    case 'string':
    default:
      return <InputItem placeholder='请输入' clear {...componentProps}>{label}</InputItem>;
  }
}

export function withRequiredMark(WrappedComponent: JSX.Element) {
  return (
    <div key={WrappedComponent.key || undefined} className={styles.required}>
      {WrappedComponent}
    </div>
  )
}

export const createFormItems = (form: any, injectError: boolean, requiredMark: boolean) => (items: ItemConfig[]) => {
  const { getFieldError, getFieldDecorator } = form;
  return items.map(item => {
    const { type = 'string', label, field, componentProps, component, fieldProps = {} } = item;

    if (type === 'hidden') {
      getFieldDecorator(field, { initialValue: fieldProps.initialValue });
      return null;
    }

    const setErrorProps = () => {
      const error = getFieldError(field);
      return injectError && error ? { error, onErrorClick() { Toast.info(error[0]); } } : {};
    }
    const setInjectProps = () => ({
      ...setErrorProps(),
      key: field,
    });

    const inputComponent = renderInputComponent(form)(type, label, field, componentProps, component);
    const setRenderItem = () => {
      if (inputComponent) {
        const withPropsComponent = withProps(setInjectProps())(inputComponent);
        return getFieldDecorator(field, {
          valuePropName: setValuePropName(type),
          ...fieldProps,
        })(withPropsComponent);
      }
      return null;
    }

    const isRequiredField = !!_find(_get(fieldProps, 'rules', []), { required: true });
    const renderItem = setRenderItem();
    const hasRequiredMark = requiredMark && isRequiredField && renderItem;
    return hasRequiredMark ? withRequiredMark(renderItem) : renderItem;
  }).filter(item => item) as JSX.Element[];
}

export default createFormItems;
