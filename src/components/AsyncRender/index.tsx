import React, { useState, useEffect } from 'react';
import CustomResult from '@/components/custom-antd-mobile/CustomResult';
import _repeat from 'lodash/repeat';
import _isFunction from 'lodash/isFunction';
import styles from './index.less';

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
    <p style={{ margin: 0 }}>
      {`加载中${_repeat('.', dotNums % (dots + 1))}`}
      <span style={{ color: 'transparent' }}>{`${_repeat('.', (dots + 1) - (dotNums % (dots + 1)))}`}</span>
    </p>
  )
}

export interface AsyncRenderProps<T = any> extends React.PropsWithoutRef<React.Props<T>> {
  getData: () => Promise<T> | T;
  children: (data: T) => any;
}

export function AsyncRender<T>({ getData, children }: AsyncRenderProps<T>): any {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<T>();

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setLoading(false);
      setData(data);
    }

    fetchData();
  }, [])

  if (loading) {
    return <CustomResult className={styles.result} message={<Loading />} />;
  }
  if (isEmptyData(data)) {
    return <CustomResult className={styles.result} message='暂无数据' />;
  }
  return children(data!);
}

export default AsyncRender;
