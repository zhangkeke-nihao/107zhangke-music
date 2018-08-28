import React from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import routes from './routes';
import './App.css';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>
);

export default App;


// import React from 'react';
// import 'antd/dist/antd.css';

// import { Provider } from 'react-redux';
// import configureStore from './store/configureStore';

// import SongBookWarpper from './container/SongBookWarpper/SongBookWarpper';
// import './App.css';

// const store = configureStore();

// const App = () => (
//   <Provider store={store}>
//     <SongBookWarpper />
//   </Provider>
// );

// export default App;
