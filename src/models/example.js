import { login,bannerupdate,bannerdelete,getall } from "../services/example";
import { routerRedux } from 'dva/router'

export default {
  namespace: 'example',

  state: {
    login:"",
    bannerupdate:"",
    bannerdelete:"",
    getall:""
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
    * getall ({ payload }, {call, put }) {
      let res = yield call(getall)
      yield put({
        type: 'updateState',
        payload: { getall:res.data }
      })
      return res.next
    },
    
    * bannerupdate ({ payload }, {call, put }) {
      let res = yield call(bannerupdate, payload)
      yield put({
        type: 'updateState',
        payload: { bannerupdate:res }
      })
      return res.next
    },
    * bannerdelete ({ payload }, {call, put }) {
      let res = yield call(bannerdelete, payload)
      yield put({
        type: 'updateState',
        payload: { bannerdelete:res }
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
