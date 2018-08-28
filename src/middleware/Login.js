/* eslint-disable */
const actionarr = [];

/* eslint-disable no-unused-vars */
export default store => next => action => {

  const gettokenValue = (data) => {
    actionarr.forEach(item => {
        item.SERVER_API.params.token = data.token;
        next(item);
    })
  }
  if (!action.SERVER_API) {
    return next(action);
  }
  const {
    type,
    endpoint,
    params
  } = action.SERVER_API;

  if (typeof type !== 'string') {
    throw new Error('type shoudle be a string');
  }
  if (typeof endpoint !== 'string') {
    throw new Error('endpoint shoudle be a string');
  }
  if (typeof params !== 'object') {
    throw new Error('params shoudle be a object');
  }
  if (params.token == '') {
    actionarr.push(action);
  }
  else {
    action.SERVER_API.params.gettokenValue = gettokenValue;
    next(action);
  }
}
