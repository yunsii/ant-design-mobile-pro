import React, { useEffect, useState, useRef } from 'react';
import { WingBlank, ListView, ActivityIndicator } from 'antd-mobile';
import { ListViewProps } from 'antd-mobile/lib/list-view';
import classNames from 'classnames';
import styles from './index.less';

export interface StandardListData<T> {
  list: T[];
  pagination: {
    current: number;
    last: number;
  },
}

export interface StandardListProps<T> extends Omit<ListViewProps, 'dataSource'> {
  getData: (current: number) => StandardListData<T> | Promise<StandardListData<T>>;
  onUnmount?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

export default function StandardList<T>(props: StandardListProps<T>) {
  const { getData, onUnmount, style, className, ...rest } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [pageData, setPageData] = useState<StandardListData<T>>({ list: [], pagination: { current: 1, last: 10 } });
  const [list, setList] = useState(new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  }));

  async function fetchData(current: number = 1) {
    setLoading(true);
    const data = await getData(current);
    const mergeData = {
      list: [...pageData.list, ...data.list],
      pagination: data.pagination,
    };
    setPageData(mergeData);
    setList(list.cloneWithRows(mergeData.list));
    setLoading(false);
  }

  useEffect(() => {
    fetchData();

    return () => {
      if (onUnmount) { onUnmount(); }
    };
  }, []);

  const listViewEl = useRef(null);

  const separator = (sectionID, rowID) => (
    <div
      key={`${sectionID}-${rowID}`}
      style={{
        backgroundColor: '#F5F5F9',
        height: '.24rem',
      }}
    />
  );

  const onEndReached = () => {
    const { pagination: { current, last } } = pageData!;
    if (current >= last) { return; }
    fetchData(current + 1);
  }

  return (
    <div style={style} className={classNames(styles.standardList, className)}>
      <WingBlank>
        {separator(0, 0)}
        <ListView
          ref={listViewEl}
          dataSource={list}
          renderFooter={() => (
            <div style={{ padding: '.3rem', textAlign: 'center' }}>
              {loading ? '加载中...' : '已加载全部数据'}
            </div>
          )}
          pageSize={2}
          renderSeparator={separator}
          useBodyScroll
          scrollRenderAheadDistance={500}
          onEndReached={onEndReached}
          onEndReachedThreshold={10}
          {...rest}
        />
      </WingBlank>
      <ActivityIndicator toast animating={loading} />
    </div>
  )
}
