import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import { fakeAccountLogin } from '@/services/api';
import { setAuthority } from '@/utils/authority';
export interface LoginState {
  status?: any;
}

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      setAuthority(response.currentAuthority);
      if (response.status === 'ok') {
        yield put(routerRedux.replace('/'));
      } else {
        Toast.fail('帐号或密码错误！')
      }
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      // redirect
      if (window.location.pathname !== '/user/login') {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
          })
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
