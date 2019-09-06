import React, { useEffect, useState, useRef } from 'react';
import { WingBlank, ListView, ActivityIndicator } from 'antd-mobile';
import { ListViewProps } from 'antd-mobile/lib/list-view';

export let allData: any[] = [];

export function setAllData(data) {
  allData = data;
}

export interface StandardListProps extends ListViewProps {
  data: {
    list: any[],
    pagination: {
      current: number,
      last: number,
    },
  };
  loading?: boolean;
  initData?: () => void;
  moreData?: () => void;
  onUnmount?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

export default function StandardList(props: StandardListProps) {
  const { data, loading, initData, moreData, onUnmount, style, className, ...rest } = props;
  const [list, setList] = useState(new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  }));

  useEffect(() => {
    if (initData) { initData() };
    return () => {
      allData = [];
      if (onUnmount) { onUnmount(); }
    };
  }, []);

  useEffect(() => {
    allData = [...allData, ...data.list];
    setList(list.cloneWithRows(allData));
  }, [data])

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
    const { pagination: { current, last } } = data;
    if (current >= last) { return; }
    if (moreData) { moreData(); }
  }

  return (
    <div style={style} className={className}>
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

StandardList.defaultProps = {
  data: {
    list: [],
    pagination: {},
  },
  loading: false,
}
