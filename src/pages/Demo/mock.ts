import _get from 'lodash/get';

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

export interface DataItem {
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

export interface IData {
  list: DataItem[];
  pagination: {
    current: number;
    last: number;
  },
}

export interface GetMockDataConfig {
  wait?: number;
}

export async function getMockData(current: number, config?: GetMockDataConfig): Promise<IData> {
  const mockData = new Promise<IData>((resolve) => {
    setTimeout(() => {
      resolve({
        list: genData(current),
        pagination: {
          current,
          last: lastPage,
        }
      });
    }, _get(config, 'wait') || 600);
  })
  return await mockData;
}
