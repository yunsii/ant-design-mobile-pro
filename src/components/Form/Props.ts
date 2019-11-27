import _values from 'lodash/values';
import _get from 'lodash/get';
import _find from 'lodash/find';
import { InputItemProps } from 'antd-mobile/lib/input-item'
import { TextareaItemProps } from 'antd-mobile/lib/textarea-item'
import { PickerPropsType } from 'antd-mobile/lib/picker/PropsType'
import { ImagePickerProps } from './components/CustomImagePicker';

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
  | "hidden"

export type ComponentProps =
  | PickerPropsType
  | WrappedImagePickerProps
  | TextareaItemProps
  | InputItemProps

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
