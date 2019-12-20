import React, { useContext } from 'react';
import classNames from 'classnames';
import { List, Button, WhiteSpace } from 'antd-mobile';
import _values from 'lodash/values';
import _get from 'lodash/get';
import _find from 'lodash/find';
import _debounce from 'lodash/debounce';
import { ButtonProps } from 'antd-mobile/lib/button'
import FormContext, { FormProvider } from './FormContext';
import createFormItems from './createFormItems';
import { ItemConfig } from './Props';
import styles from './index.less';

export interface Props {
  header?: any;
  items?: ItemConfig[];
  onSubmit?: (fieldsValue: any) => void;
  buttonText?: string | null;
  buttonProps?: ButtonProps;
  style?: React.CSSProperties;
  className?: string;
  /** use footer errors hint, or inject errors hint, default footer errors hint */
  errorsFooter?: boolean;
  /** whether hide required mark before label, default false */
  hideRequiredMark?: boolean;
}

function FormList(props: Props) {
  const {
    header,
    items = [],
    errorsFooter = true,
    onSubmit = () => { },
    style,
    buttonText = '确定',
    buttonProps,
    className,
    hideRequiredMark = false,
  } = props;
  const form = useContext(FormContext);
  const { getFieldsError } = form;

  const handleClick = _debounce(() => {
    if (form) {
      form.validateFields((err?: { [k: string]: { errors: any[] } }, values?: any) => {
        if (process.env.NODE_ENV !== 'production') {
          console.log('form err:', err);
          console.log('form values', values);
        }
        if (err) { return; }
        onSubmit(values);
      });
    }
  }, 400);

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

  //由于可以组装不同的表单配置，所以需要按需从各自的表单配置中取出各自的错误信息
  const errors = _values(getFieldsError(items.map(item => item.field))).filter(item => item);
  const setListProps = () => {
    const result: any = {};
    if (header) { result.renderHeader = () => header; }
    if (errorsFooter) {
      result.renderFooter = () => <span className={styles['error-text']}>{errors.join('，')}</span>;
    }
    return result;
  }

  return (
    <div>
      {!!items.length && (
        <List style={style} className={classNames(styles['render-footer'], errors.length ? styles['show-errors'] : styles['hide-errors'], className)} {...setListProps()}>
          {createFormItems(form, !errorsFooter, !hideRequiredMark)(items)}
        </List>
      )}

      {buttonText && (
        <>
          <WhiteSpace />
          <List>
            <List.Item>{renderButton()}</List.Item>
          </List>
        </>
      )}
    </div>
  )
}

export interface FormProps extends Props {
  form: any;
}

export default ({ form, ...rest }: FormProps) => (
  <FormProvider value={form}>
    <FormList {...rest} />
  </FormProvider>
);
