import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd-mobile';
import PageWrapper from '@/components/PageWrapper';
import StandardList from '@/components/StandardList';

const data = [
  {
    title: 'Thomas Carlyle',
    desc: 'Cease to struggle and you cease to live.',
  },
  {
    title: 'John Ruskin',
    desc: 'Living without an aim is like sailing without a compass.',
  },
  {
    title: 'Julius Erving',
    desc: 'Gods determine what you\'re going to be.',
  },
];

interface DataItem {
  id: string;
  title: string;
  desc: string;
}

const lastPage = 4;

function genData(page: number) {
  const result: DataItem[] = []
  for (let i = 0; i < 10; i += 1) {
    result.push({ ...data[i % data.length], id: `${page - 1}${i}` });
  }
  return result;
}

interface IData {
  list: DataItem[];
  pagination: {
    current: number;
    last: number;
  },
}

async function getData(current: number): Promise<IData> {
  const mockData = new Promise<IData>((resolve) => {
    setTimeout(() => {
      resolve({
        list: genData(current),
        pagination: {
          current,
          last: lastPage,
        }
      });
    }, 600);
  })
  return await mockData;
}

class StandardListDemo extends React.PureComponent {
  renderRow = (rowData, sectionID, rowID) => {
    return (
      <Card
        key={rowID}
      >
        <Card.Header title={`${rowData.id}. ${rowData.title}`} />
        <Card.Body>
          <div style={{ lineHeight: 1 }}>
            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{rowData.desc}</div>
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
          getData={getData}
        />
      </PageWrapper>
    );
  }
}

export default connect()(StandardListDemo);
