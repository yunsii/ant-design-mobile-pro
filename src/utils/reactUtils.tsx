import React from 'react';
import _debounce from 'lodash/debounce';
import { Result } from 'antd-mobile';

export function injectProps(props: any) {
  return (WrappedComponent: JSX.Element) => {
    return React.cloneElement(WrappedComponent, props);
  };
}

/**
 * 条件渲染异步数据。
 * 
 * 如果数据为数组或者对象，数据为空时渲染 "暂无数据"
 * 
 * @param loading 数据是否加载中
 * @param data 待渲染数据
 * @param element 加载结束后的渲染组件
 */
export function renderAsyncData<T>(loading: boolean, data: T | T[]) {
  return (element: any) => {
    if (loading) {
      return <Result message='加载中...' />
    }
    if ((Array.isArray(data) && !data.length) || !Object.keys(data).length) {
      return <Result message='暂无数据' />
    }
    return element;
  }
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
