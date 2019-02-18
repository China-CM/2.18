import {query} from '../services/example';

export default {

  namespace: 'example',

  state: {
    data:[],
    isShow:false,
    modaldata:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      let data=yield call(query);
      yield put({
        type:'save',
        payload:{
          data:data.data.apis
        }
      })
    },
    *showModel(payload,{call,put,select}){
      let status=yield select((store)=>{
        return store.example.isShow
      })
      yield put({
        type:'showChange',
        payload:{
            isShow:!status
        }
      })
      yield put({
        type:'modaldata',
        payload:{
          modaldata:payload.payload
        }
      })
    },
    *ok(_, { call, put }) {  // eslint-disable-line
      yield put({
        type:'showChange',
        payload:{
          isShow:false
        }
      })
    },
    *cancel(_, { call, put }) {  // eslint-disable-line
      yield put({
        type:'showChange',
        payload:{
          isShow:false
        }
      })
    },
  },

  reducers: {
    save(state, action) {
      console.log(action.payload)
      return { ...state, ...action.payload };
    },
    showChange(state,action){
      return { ...state, ...action.payload };
    },
    modaldata(state,action){
      return { ...state,...action.payload };
    }
  },

};
