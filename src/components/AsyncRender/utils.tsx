import React, { useState, useEffect } from 'react';
import CustomResult from '@/components/custom-antd-mobile/CustomResult';
import _repeat from 'lodash/repeat';
import _isFunction from 'lodash/isFunction';

export function isEmptyData<T>(data: T) {
  const isEmptyArray = Array.isArray(data) && !data.length;
  return isEmptyArray || !data || !Object.keys(data).length;
}

export const Loading: React.FC<{}> = () => {
  const [dotsNo, setDotsNo] = useState(0);
  const dotsLength = 3;

  useEffect(() => {
    const setDotNumsInterval = setInterval(() => {
      setDotsNo((dotsNo + 1) % (dotsLength + 1));
    }, 333);

    return () => { clearInterval(setDotNumsInterval); }
  }, [dotsNo]);

  return (
    <p style={{ margin: 0 }}>
      {`加载中${_repeat('.', dotsNo)}`}
      <span style={{ color: 'transparent' }}>
        {`${_repeat('.', (dotsLength + 1) - dotsNo)}`}
      </span>
    </p>
  )
}

export function checkAndRender<T>(loading: boolean, data: T) {
  if (loading) {
    return <CustomResult message={<Loading />} />;
  }
  if (isEmptyData(data)) {
    return <CustomResult message='暂无数据' />;
  }
  return null;
}
