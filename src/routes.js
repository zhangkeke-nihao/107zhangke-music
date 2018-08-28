import MyMusicWrapper from './container/MyMusicWrapper/MyMusicWrapper';
import AppWarpper from './container/AppWarpper/AppWarpper';
import SearchMusic from './container/SearchMusicWrapper/SearchMusic';
import UploadMusic from './container/UploadMusicWrapper/UploadMusic';

const routes = [{
  path: '/',
  component: AppWarpper,
  indexRoute: { component: MyMusicWrapper },
  childRoutes: [
    { path: 'searchmusic', component: SearchMusic },
    { path: 'mymusicwrapper', component: MyMusicWrapper },
    { path: 'uploadmusic', component: UploadMusic }
  ]
}];

export default routes;
