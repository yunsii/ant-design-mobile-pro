import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd-mobile';
import PageWrapper from '@/components/PageWrapper';
import StandardList from '@/components/StandardList';
import { getMockData } from '../mock';

class StandardListDemo extends React.PureComponent {
  renderRow = (rowData, sectionID, rowID) => {
    return (
      <Card
        key={rowID}
      >
        <Card.Header style={{ fontWeight: 'bold' }} title={`${rowData.id}. ${rowData.title}`} />
        <Card.Body>
          <div style={{ lineHeight: 1 }}>
            <div style={{ marginBottom: '8px' }}>{rowData.desc}</div>
          </div>
        </Card.Body>
      </Card>
    )
  }

  render() {
    return (
      <PageWrapper title='长列表' backable>
        <StandardList
          renderRow={this.renderRow}
          getData={getMockData}
        />
      </PageWrapper>
    );
  }
}

export default connect()(StandardListDemo);
