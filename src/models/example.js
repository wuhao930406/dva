import {
  login, bannerupdate, bannerdelete, getall,
  getadv, updateadv, getaboutus, updateaboutus, getservice, updateservice,
  getenv, envupdate, envdelete, insertdevlop, updatedevlop, getdevlop, getachieve, updateachieve,
  insertcourse, updatecourse, getcourse, getschool, updateschool, getedu, insertedu, deletedu, updatedu,
  getcooperate, updatecooperate

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
    getenv: [],
    insertdevlop: {},
    insertcourse: {},
    updatedevlop: {},
    getdevlop: [],
    getachieve: [],
    getcourse: {},
    getschool: {},
    getedu: {},
    getcooperate: {}
  },

  effects: {
    * getcooperate({ payload }, { call, put }) {
      let res = yield call(getcooperate)
      yield put({
        type: 'updateState',
        payload: { getcooperate: res.data }
      })
      return res.next
    },
    * getedu({ payload }, { call, put }) {
      let res = yield call(getedu)
      yield put({
        type: 'updateState',
        payload: { getedu: res.data }
      })
      return res.next
    },
    * getschool({ payload }, { call, put }) {
      let res = yield call(getschool)
      yield put({
        type: 'updateState',
        payload: { getschool: res.data }
      })
      return res.next
    },
    * getcourse({ payload }, { call, put }) {
      let res = yield call(getcourse)
      yield put({
        type: 'updateState',
        payload: { getcourse: res.data }
      })
      return res.next
    },
    * getachieve({ payload }, { call, put }) {
      let res = yield call(getachieve)
      yield put({
        type: 'updateState',
        payload: { getachieve: res.data }
      })
      return res.next
    },
    * getdevlop({ payload }, { call, put }) {
      let res = yield call(getdevlop)
      yield put({
        type: 'updateState',
        payload: { getdevlop: res.data }
      })
      return res.next
    },
    * getenv({ payload }, { call, put }) {
      let res = yield call(getenv)
      yield put({
        type: 'updateState',
        payload: { getenv: res.data }
      })
      return res.next
    },
    * envupdate({ payload }, { call, put }) {
      let res = yield call(envupdate, payload)
      yield put({
        type: 'updateState',
        payload: { code: res }
      })
      return res.next
    },
    * envdelete({ payload }, { call, put }) {
      let res = yield call(envdelete, payload)
      yield put({
        type: 'updateState',
        payload: { code: res }
      })
      return res.next
    },


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
    * updateachieve({ payload }, { call, put }) {
      let res = yield call(updateachieve, payload)
      yield put({
        type: 'updateState',
        payload: { code: res }
      })
      return res.next
    },
    * updatecourse({ payload }, { call, put }) {
      let res = yield call(updatecourse, payload)
      yield put({
        type: 'updateState',
        payload: { code: res }
      })
      return res.next
    },
    * updateschool({ payload }, { call, put }) {
      let res = yield call(updateschool, payload)
      yield put({
        type: 'updateState',
        payload: { code: res }
      })
      return res.next
    },
    * updatedu({ payload }, { call, put }) {
      let res = yield call(updatedu, payload)
      yield put({
        type: 'updateState',
        payload: { code: res }
      })
      return res.next
    },
    * updatecooperate({ payload }, { call, put }) {
      let res = yield call(updatecooperate, payload)
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

    * insertedu({ payload }, { call, put }) {
      let res = yield call(insertedu, payload)
      yield put({
        type: 'updateState',
        payload: { insertedu: res }
      })
      return res.next
    },

    * insertcourse({ payload }, { call, put }) {
      let res = yield call(insertcourse, payload)
      yield put({
        type: 'updateState',
        payload: { insertcourse: res }
      })
      return res.next
    },
    * insertdevlop({ payload }, { call, put }) {
      let res = yield call(insertdevlop, payload)
      yield put({
        type: 'updateState',
        payload: { insertdevlop: res }
      })
      return res.next
    },
    * updatedevlop({ payload }, { call, put }) {
      let res = yield call(updatedevlop, payload)
      yield put({
        type: 'updateState',
        payload: { code: res }
      })
      return res.next
    },

    * deletedu({ payload }, { call, put }) {
      let res = yield call(deletedu, payload)
      yield put({
        type: 'updateState',
        payload: { code: res }
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
