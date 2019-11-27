import React from 'react';
import { List, Switch } from 'antd-mobile';
import { createForm } from 'rc-form';
import PageWrapper from '@/components/PageWrapper';
import Form from '@/components/Form';
import { ItemConfig } from '@/components/Form/Props';

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

const setBasicItems: (form: any) => ItemConfig[] = (form) => {
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
      type: 'date',
      label: '出生日期',
      field: 'date',
      fieldProps: {
        rules: [
          {
            required: true, message: '请选择出生日期',
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
      type: 'picture',
      label: '照片',
      field: 'picture',
      fieldProps: {
        rules: [
          {
            required: true, message: '请上传照片',
          }
        ],
      },
      componentProps: {
        filesCountLimit: 5,
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

const setAdvancedItems: (form: any) => ItemConfig[] = (form) => {
  return [
    {
      type: 'textarea',
      field: 'profile',
      fieldProps: {
        initialValue: '各位评委老师好，我是...',
        rules: [
          {
            required: true, message: '请填写个人简介',
          }
        ],
      },
      componentProps: {
        rows: 5,
        count: 100,
      },
    },
  ];
}

class FormDemo extends React.PureComponent<any> {
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
