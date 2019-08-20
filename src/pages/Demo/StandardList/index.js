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

class Welcome extends React.PureComponent {
  state = {
    list: [],
    loading: true,
    current: 0,
  }

  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    // simulate initial Ajax
    setTimeout(() => {
      this.setState({
        list: genData(1),
        loading: false,
        current: 1,
      });
    }, 600);
  }

  moreData = () => {
    this.setState({
      loading: true,
    })
    setTimeout(() => {
      const { current } = this.state;
      this.setState({
        list: genData(current + 1),
        loading: false,
        current: current + 1,
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
    const { list, loading, current } = this.state;
    return (
      <PageWrapper title='长列表' backable>
        <StandardList
          data={list}
          loading={loading}
          renderRow={this.renderRow}
          moreData={this.moreData}
          hasMore={current < lastPage}
        />
      </PageWrapper>
    );
  }
}

export default connect()(Welcome);
