import React from 'react';
import _repeat from 'lodash/repeat';
import _isFunction from 'lodash/isFunction';
import { checkAndRender } from '../utils';

export interface AsyncRenderWithDataProps<T = any> extends React.PropsWithoutRef<React.Props<T>> {
  loading: boolean;
  data: T;
  children: ((data: T) => JSX.Element) | JSX.Element;
}

export function AsyncRenderWithData<T>({ loading, data, children }: AsyncRenderWithDataProps<T>): JSX.Element {
  const renderChildren = () => _isFunction(children) ? children(data) : children;
  return checkAndRender(loading, data) || renderChildren();
}

export default AsyncRenderWithData;
