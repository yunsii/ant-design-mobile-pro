import React from 'react';
import { List, Switch } from 'antd-mobile';
import { createForm } from 'rc-form';
import PageWrapper from '@/components/PageWrapper';
import Form, { FormProvider } from '@/components/Form';

const gender = [
  {
    label: '男',
    value: 'm',
  },
  {
    label: '女',
    value: 'w',
  },
]

const setItems = (form) => {
  const { getFieldProps } = form;
  return [
    {
      fieldName: 'name',
      inputItemProps: {
        label: '姓名'
      },
      fieldProps: {
        rules: [
          {
            required: true, message: '请输入姓名',
          }
        ],
      }
    },
    {
      type: 'picker',
      fieldName: 'gender',
      inputItemProps: {
        label: '性别',
        data: gender,
      },
      fieldProps: {
        rules: [
          {
            required: true, message: '请选择性别',
          }
        ],
      }
    },
    {
      type: 'custom',
      fieldName: 'confirm',
      component: (
        <List.Item
          extra={<Switch {...getFieldProps('confirm', { initialValue: true, valuePropName: 'checked' })} />}
        >
          确认信息
      </List.Item>
      ),
    },
  ];
}

class FormDemo extends React.PureComponent {
  render() {
    const { form } = this.props;
    return (
      <PageWrapper title='表单' backable>
        <FormProvider value={form}>
          <Form
            header="个人信息"
            items={setItems(form)}
            handleSubmit={values => console.log(values)}
          />
        </FormProvider>
      </PageWrapper>
    );
  }
}

export default createForm()(FormDemo);
