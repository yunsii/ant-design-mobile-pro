import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd-mobile';
import PageWrapper from '@/components/PageWrapper';
import StandardList from '@/components/StandardList';

const data = [
  {
    title: 'Thomas Carlyle',
    des: 'Cease to struggle and you cease to live.',
  },
  {
    title: 'John Ruskin',
    des: 'Living without an aim is like sailing without a compass.',
  },
  {
    title: 'Julius Erving',
    des: 'Gods determine what you\'re going to be.',
  },
];

const lastPage = 4;

function genData(page) {
  const result = []
  for (let i = 0; i < 10; i += 1) {
    result.push({ ...data[i % data.length], id: `${page - 1}${i}` });
  }
  return result;
}

class StandardListDemo extends React.PureComponent {
  state = {
    list: [],
    loading: true,
    current: 0,
    data: {
      list: [],
      pagination: {},
    }
  }

  initData = () => {
    setTimeout(() => {
      this.setState({
        loading: false,
        data: {
          list: genData(1),
          pagination: {
            current: 1,
            last: lastPage,
          }
        }
      });
    }, 600);
  }

  moreData = () => {
    this.setState({
      loading: true,
    })
    setTimeout(() => {
      const { pagination: { current } } = this.state.data;
      this.setState({
        loading: false,
        data: {
          list: genData(current + 1),
          pagination: {
            current: current + 1,
            last: lastPage,
          }
        }
      });
    }, 600);
  }

  renderRow = (rowData, sectionID, rowID) => {
    return (
      <Card
        key={rowID}
      >
        <Card.Header title={`${rowData.id}. ${rowData.title}`} />
        <Card.Body>
          <div style={{ lineHeight: 1 }}>
            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{rowData.des}</div>
          </div>
        </Card.Body>
      </Card>
    )
  }
  
  render() {
    const { data, loading } = this.state;
    return (
      <PageWrapper title='长列表' backable>
        <StandardList
          data={data}
          loading={loading}
          renderRow={this.renderRow}
          initData={this.initData}
          moreData={this.moreData}
        />
      </PageWrapper>
    );
  }
}

export default connect()(StandardListDemo);
