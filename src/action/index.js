import { normalize } from 'normalizr';
import * as ActionTypes from '../const/ActionType';
import * as schemes from '../schema/index';

export function fetchLoginInfo(mid) { // 拉取登录数据
  return {
    SERVER_API: {
      type: ActionTypes.FETCH_LOGIN_INFO,
      endpoint: '/login',
      params: { mid }
    }
  };
}

export function fetchMyMusicInfo(token) { // 拉取我的音乐列表数据
  return {
    SERVER_API: {
      type: ActionTypes.FETCH_MYMUSIC_INFO,
      endpoint: '/music/my_list',
      params: { token },
      normalizeFuc: response => normalize(response, schemes.MYMUSICDATA)
    }
  };
}
export function fetchRecommendMusicInfo(token) { // 拉取推荐音乐数据
  return {
    SERVER_API: {
      type: ActionTypes.FETCH_RECOMMEND_MUSIC_INFO,
      endpoint: '/music/recommend_list',
      params: { token },
      normalizeFuc: response => normalize(response.data, schemes.LIST)
    }
  };
}

export function getsinglemusicItemId(id) { // 获得单选状态下音乐id
  return {
    type: ActionTypes.GET_SINGLE_MUSIC_ITEM_ID,
    id
  };
}


export function getMutiplemusicItemId(id) { // 获得多选状态下音乐id
  return {
    type: ActionTypes.GET_MUTIPLE_MUSIC_ITEM_ID,
    id
  };
}

export function singledeletemusicitem() {
  return {
    type: ActionTypes.SINGLE_DELETE_MUSIC_ITEM
  };
}
export function mutipledeletemusicitem() {
  return {
    type: ActionTypes.MUTIPLE_DELETE_MUSIC_ITEM
  };
}

export function changeMusicname(value) {
  return {
    type: ActionTypes.CHANGE_MUSIC_NAME,
    value
  };
}
export function singleclick() {
  return {
    type: ActionTypes.SINGLE_CLICK_STATUS
  };
}

export function mutipleclick() {
  return {
    type: ActionTypes.MUTIPLE_CLICK_STATUS
  };
}

export function changemark(start, end) {
  return {
    type: ActionTypes.CHANGE_MARK_TIME,
    start,
    end
  };
}
