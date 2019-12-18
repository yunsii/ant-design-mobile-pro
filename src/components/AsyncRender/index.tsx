import React, { useState, useEffect } from 'react';
import CustomResult from '@/components/custom-antd-mobile/CustomResult';
import _repeat from 'lodash/repeat';
import _isFunction from 'lodash/isFunction';

export function isEmptyData<T>(data: T) {
  const isEmptyArray = Array.isArray(data) && !data.length;
  return isEmptyArray || !data || !Object.keys(data).length;
}

const Loading: React.FC<{}> = () => {
  const [dotNums, setDotNums] = useState(0);
  const dots = 3;

  useEffect(() => {
    const setDotNumsInterval = setInterval(() => {
      setDotNums(dotNums + 1);
    }, 333);

    return () => { clearInterval(setDotNumsInterval); }
  }, [dotNums]);

  return (
    <p>
      {`加载中${_repeat('.', dotNums % (dots + 1))}`}
      <span style={{ color: 'transparent' }}>{`${_repeat('.', (dots + 1) - (dotNums % (dots + 1)))}`}</span>
    </p>
  )
}

export interface AsyncRenderProps<T = any> extends React.PropsWithoutRef<React.Props<T>> {
  loading: boolean;
  data: T;
  children: ((data: T) => JSX.Element) | JSX.Element;
}

export function AsyncRender<T>({ loading, data, children }: AsyncRenderProps<T>): JSX.Element {
  if (loading) {
    return <CustomResult message={<Loading />} />;
  }
  if (isEmptyData(data)) {
    return <CustomResult message='暂无数据' />;
  }
  return _isFunction(children) ? children(data) : children;
}

export default AsyncRender;
