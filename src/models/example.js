import { login,bannerupdate } from "../services/example";
import { routerRedux } from 'dva/router'

export default {
  namespace: 'example',

  state: {
    login:"",
    bannerupdate:""
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
    * bannerupdate ({ payload }, {call, put }) {
      let res = yield call(bannerupdate, payload)
      yield put({
        type: 'updateState',
        payload: { bannerupdate:res }
      })
      return res.next
    },

  },

  reducers: {
    updateState (state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
