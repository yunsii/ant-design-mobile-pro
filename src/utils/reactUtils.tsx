import React from 'react';
import _debounce from 'lodash/debounce';
import { Result } from 'antd-mobile';

export function injectProps(props: any) {
  return (WrappedComponent: JSX.Element) => {
    return React.cloneElement(WrappedComponent, props);
  };
}

export const setLoading = (ins: React.Component, field: string) => (func: Function) => async (...rest: any) => {
  ins.setState({
    [field]: true,
  });
  await func(...rest);
  ins.setState({
    [field]: false,
  });
}

export const setLoadingDebounceWith =
  (wait = 400) =>
    (ins: React.Component, field: string) =>
      (func: Function) =>
        _debounce(setLoading(ins, field)(func), wait);

export const setLoadingDebounce = setLoadingDebounceWith();
