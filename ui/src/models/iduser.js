import { create, del } from '../services/iduser';

export default {
  namespace: 'iduser',

  state: {
    list: []
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(create);
      yield put({
        type: 'save',
        payload: response,
      });
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    }
  },
};
