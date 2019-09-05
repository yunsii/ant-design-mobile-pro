import React from 'react';
// import { List, Switch, TextareaItem } from 'antd-mobile';
import PageWrapper from '@/components/PageWrapper';
import CutomAMap from '@/components/CutomAMap';

class FormDemo extends React.PureComponent {
  render() {
    return (
      <PageWrapper title='高德地图' backable>
        <CutomAMap
          wrapperStyle={{ height: 'calc(100vh - 1rem)' }}
        />
      </PageWrapper>
    );
  }
}

export default FormDemo;
