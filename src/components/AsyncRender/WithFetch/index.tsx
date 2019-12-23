import React, { useState, useEffect } from 'react';
import _repeat from 'lodash/repeat';
import _isFunction from 'lodash/isFunction';
import { checkAndRender } from '../utils';

export interface AsyncRenderWithFetchProps<T = any> extends React.PropsWithoutRef<React.Props<T>> {
  getData: () => Promise<T> | T;
  children: (data: T) => any;
}

export function AsyncRenderWithFetch<T>({ getData, children }: AsyncRenderWithFetchProps<T>): any {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<T>();

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setLoading(false);
      setData(data);
    }

    fetchData();
  }, []);

  return checkAndRender(loading, data) || children(data!);
}

export default AsyncRenderWithFetch;
