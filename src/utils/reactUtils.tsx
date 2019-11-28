import React from 'react';
import { Result } from 'antd-mobile';

export function withProps(props: any) {
  return function injectProps(WrappedComponent: JSX.Element) {
    return React.cloneElement(WrappedComponent, props)
  }
}

export function renderAsyncData<T>(loading: boolean, data: T | T[], element: any) {
  if (loading) {
    return <Result message='加载中...' />
  }
  if ((Array.isArray(data) && !data.length) || !Object.keys(data).length) {
    return <Result message='暂无数据' />
  }
  return element;
}