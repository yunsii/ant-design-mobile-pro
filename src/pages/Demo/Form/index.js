import React from 'react';
import { List, Switch, TextareaItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import PageWrapper from '@/components/PageWrapper';
import Form from '@/components/Form';

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

const setBasicItems = (form) => {
  const { getFieldProps } = form;
  return [
    {
      label: '姓名',
      field: 'name',
      fieldProps: {
        rules: [
          {
            required: true, message: '请输入姓名',
          }
        ],
      },
    },
    {
      type: 'picker',
      label: '性别',
      field: 'gender',
      fieldProps: {
        rules: [
          {
            required: true, message: '请选择性别',
          }
        ],
      },
      componentProps: {
        data: gender,
      },
    },
    {
      type: 'custom',
      field: 'confirm',
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

const setAdvancedItems = (form) => {
  const { getFieldProps } = form;
  return [
    {
      type: 'custom',
      field: 'confirm',
      component: (
        <TextareaItem
          {...getFieldProps('intro', {
            initialValue: '各位评委老师好，我是...',
          })}
          rows={5}
          count={100}
        />
      ),
    },
  ];
}

class FormDemo extends React.PureComponent {
  render() {
    const { form } = this.props;
    return (
      <PageWrapper title='表单' backable>
        <Form
          form={form}
          header="个人信息"
          items={setBasicItems(form)}
          buttonText={null}
        />
        <Form
          form={form}
          header="个人简介"
          items={setAdvancedItems(form)}
          onSubmit={values => console.log(values)}
        />
      </PageWrapper>
    );
  }
}

export default createForm()(FormDemo);
