import React from 'react';
import { List, InputItem, Picker, TextareaItem, Toast, DatePicker } from 'antd-mobile';
import _values from 'lodash/values';
import _get from 'lodash/get';
import _find from 'lodash/find';
import CustomImagePicker from '../components/CustomImagePicker';
import {
  WrappedImagePickerProps,
  ComponentType,
  ItemConfig,
} from '../Props';
import styles from './index.less';

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
      );
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
      });
      return <WrappedImagePicker />;
    case 'textarea':
      return <TextareaItem title={label} rows={2} placeholder='请输入' />;
    case 'date':
    case 'time':
    case 'datetime':
      return <DatePicker mode={type}><List.Item arrow="horizontal">{label}</List.Item></DatePicker>;
    case 'string':
    default:
      return <InputItem placeholder='请输入' clear {...componentProps}>{label}</InputItem>;
  }
}

export const createFormItems = (form: any, injectError: boolean, requiredMark: boolean) => (items: ItemConfig[]) => {
  const { getFieldProps, getFieldError } = form;
  return items.map(item => {
    const { type = 'string', label, field, componentProps, component, fieldProps = {} } = item;

    if (type === 'hidden') {
      getFieldProps(field, { initialValue: fieldProps.initialValue });
      return null;
    }

    const setErrorProps = () => {
      const error = getFieldError(field);
      return injectError && error ? { error, onErrorClick() { Toast.info(error[0]); } } : {};
    }
    const setInjectFieldProps = () => type !== 'custom' ? getFieldProps(field, { valuePropName: setValuePropName(type), ...fieldProps }) : {};

    const renderComponent = renderInputComponent(form)(type, label, field, componentProps, component);
    const renderItem = renderComponent && (
      React.cloneElement(
        renderComponent,
        {
          ...componentProps as any,
          ...setInjectFieldProps(),
          ...setErrorProps(),
          key: field,
        }
      )
    )

    const isRequiredField = !!_find(_get(fieldProps, 'rules', []), { required: true });

    return requiredMark && isRequiredField && renderItem ? (
      <div key={field} className={styles.required}>
        {renderItem}
      </div>
    ) : renderItem;
  }).filter(item => item) as JSX.Element[];
}

export default createFormItems;
