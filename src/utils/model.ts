import _find from 'lodash/find';
import _isArray from 'lodash/isArray';
import _partial from 'lodash/partial';

export function getData(response) {
  const { data } = response;
  return data || {};
}

export function getTableList(response) {
  // 本地化更新数据，直接传入数组
  if (_isArray(response)) {
    return { list: response };
  }
  // 请求接口响应数据处理
  const { data } = response;
  return data.data
    ? {
      list: _isArray(data.data) ? data.data : [],
      pagination: {
        current: data.current_page,
        pageSize: data.per_page,
        total: data.total,
      },
    }
    : { list: _isArray(data) ? data : [] };
}

export function isResponseOk(response) {
  return response && response.code === 200;
}
