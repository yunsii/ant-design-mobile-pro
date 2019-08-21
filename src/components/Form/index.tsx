import React from 'react';
import { createForm } from 'rc-form';
import { List, Toast } from 'antd-mobile';
import { Button } from '@/components/CustomAntdMobile';

export interface FormProps {
  form: any;
  items: [string, React.ReactElement, any][];
  handleSubmit: (fieldsValue: any) => void;
}

function Form(props: FormProps) {
  const { form, items, handleSubmit } = props;
  const { getFieldProps, getFieldError } = form;
  console.log(getFieldError('count'));
  // console.log(getFieldsError());

  const injectItems = (_items: any) => {
    return _items.map(item => {
      const [fieldName, component, options] = item;
      const error = getFieldError(fieldName);
      return (
        React.cloneElement(
          component,
          {
            key: fieldName,
            ...getFieldProps(
              fieldName,
              options || undefined,
            ),
            error,
            onErrorClick: () => Toast.info(error[0]),
          }
        )
      );
    });
  }

  let formItems = injectItems(items);

  const handleClick = () => {
    form.validateFields((err, values) => {
      if (err) return;
      handleSubmit(values);
    })
  }

  return (
    <List>
      {formItems}
      <List.Item>
        <Button
          type='primary'
          onClick={handleClick}
        >
          确定
        </Button>
      </List.Item>
    </List>
  )
}

export default createForm()(Form);
