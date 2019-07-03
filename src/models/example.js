import {
  login, bannerupdate, bannerdelete, getall,
  getadv, updateadv, getaboutus, updateaboutus, getservice, updateservice

} from "../services/example";
import { routerRedux } from 'dva/router'

export default {
  namespace: 'example',

  state: {
    login: "",
    getall: [],
    getadv: [],
    getaboutus: [],
    code: "",
    getservice: [],
  },

  effects: {
    * getservice({ payload }, { call, put }) {
      let res = yield call(getservice)
      yield put({
        type: 'updateState',
        payload: { getservice: res.data }
      })
      return res.next
    },
    * updateservice({ payload }, { call, put }) {
      let res = yield call(updateservice, payload)
      yield put({
        type: 'updateState',
        payload: { code: res }
      })
      return res.next
    },

    * getaboutus({ payload }, { call, put }) {
      let res = yield call(getaboutus)
      yield put({
        type: 'updateState',
        payload: { getaboutus: res.data }
      })
      return res.next
    },
    * updateaboutus({ payload }, { call, put }) {
      let res = yield call(updateaboutus, payload)
      yield put({
        type: 'updateState',
        payload: { code: res }
      })
      return res.next
    },

    * getadv({ payload }, { call, put }) {
      let res = yield call(getadv)
      yield put({
        type: 'updateState',
        payload: { getadv: res.data }
      })
      return res.next
    },
    * updateadv({ payload }, { call, put }) {
      let res = yield call(updateadv, payload)
      yield put({
        type: 'updateState',
        payload: { code: res }
      })
      return res.next
    },


    * login({ payload }, { call, put }) {
      let res = yield call(login, payload)
      yield put({
        type: 'updateState',
        payload: { login: res }
      })
      return res.next
    },
    * redirect({ payload }, { put }) {
      yield put(routerRedux.push(payload.url, payload.params));
      return true
    },
    * getall({ payload }, { call, put }) {
      let res = yield call(getall)
      yield put({
        type: 'updateState',
        payload: { getall: res.data }
      })
      return res.next
    },

    * bannerupdate({ payload }, { call, put }) {
      let res = yield call(bannerupdate, payload)
      yield put({
        type: 'updateState',
        payload: { code: res }
      })
      return res.next
    },
    * bannerdelete({ payload }, { call, put }) {
      let res = yield call(bannerdelete, payload)
      yield put({
        type: 'updateState',
        payload: { code: res }
      })
      return res.next
    },



  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
