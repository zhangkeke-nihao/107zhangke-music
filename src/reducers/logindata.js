/* eslint-disable */
import * as ActionTypes from '../const/ActionType';

const initState = {
  title: '',
  token: ''
};

export default function logindata(state = initState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_LOGIN_INFO_SUC:
      const title = action.response.data.nick;
      const token = action.response.data.token;
      return {
        ...state,
        title,
        token
      };
    default:
      return state;
  }
}

