import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Login from '../middleware/Login';
import serverApi from '../middleware/serverApi';
import rootReducer from '../reducers';

const configureStore = preloadedState => createStore(
  rootReducer, // reducer,处理action的reducer方法
  preloadedState, // 初始化state，可以不传，便于app恢复现场数据
  applyMiddleware(thunk, Login, serverApi) // applyMiddleware redux函数，应用中间件，插入中间件，可以插无限个，按顺序
);

export default configureStore;
