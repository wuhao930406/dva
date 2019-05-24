import { login } from "../services/example";
import { routerRedux } from 'dva/router'

export default {
  namespace: 'example',

  state: {
    login:""
  },

  effects: {
    * login({ payload }, { call, put }) {  
      let res = yield call(login, payload)
      yield put({
        type: 'updateState',
        payload: { login:res }
      })
      return res.next
    },
    * redirect ({ payload }, { put }) {
      yield put(routerRedux.push(payload.url,payload.params));
      return true
    },

  },

  reducers: {
    updateState (state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
