/* eslint-disable */
import * as ActionTypes from '../const/ActionType';

const initState = {
  listentities: {},
  mymusicentities: {},
  recommendentities: {},
  mymusicIndex: [],
  recommendIndex: [],
  musicchooseId: '',
  mutiplearr: []
};

export default function musicdata(state = initState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_MYMUSIC_INFO_SUC: // 我的音乐列表请求数据成功
      const mymusicIndex = action.response.result;
      return {
        ...state,
        mymusicIndex,
        listentities: action.response.entities.list,
        mymusicentities: action.response.entities.mymusicdata
      };
    case ActionTypes.FETCH_RECOMMEND_MUSIC_INFO_SUC: // 推荐音乐列表请求数据成功
      const recommendIndex = action.response.result.list;
      return {
        ...state,
        recommendIndex,
        recommendentities: action.response.entities.list
      };
    case ActionTypes.SINGLE_CLICK_STATUS: // 点击单选
      const newchooseid = state.mutiplearr[0];
      return {
        ...state,
        musicchooseId: newchooseid
      };
    case ActionTypes.MUTIPLE_CLICK_STATUS: // 点击多选
      const newmutiplearr = [];
      if (state.musicchooseId) {
        newmutiplearr.push(state.musicchooseId);
      }
      return {
        ...state,
        mutiplearr: newmutiplearr
      };
    case ActionTypes.GET_SINGLE_MUSIC_ITEM_ID: // 获取单选状态下音乐id
      return {
        ...state,
        musicchooseId: action.id
      };
    case ActionTypes.GET_MUTIPLE_MUSIC_ITEM_ID: // 获取多选状态下音乐id
      const newarr = state.mutiplearr.slice();
      let count = 0;
      for (let i = 0; i < newarr.length; i++) {
        if (newarr[i] != action.id) {
          count++;
        }
      }
      if (newarr.length <= count && newarr.length < 5) {
        newarr.push(action.id);
      }
      else {
        for (let m = 0; m < newarr.length; m++) {
          if (newarr[m] == action.id) {
            newarr.splice(m, 1);
          }
        }
      }
      return {
        ...state,
        mutiplearr: newarr
      };
    case ActionTypes.SINGLE_DELETE_MUSIC_ITEM: // 单选状态下删除
      state.mymusicIndex.map(id => {
        if (state.mymusicentities[id] !== undefined) {
          state.mymusicentities[id].list.map((item, idx) => {
            if (state.musicchooseId == item) {
              state.mymusicentities[id].list.splice(idx, 1);
              state.musicchooseId = '';
            }
          });
        }
      });
      return {
        ...state
      };
    case ActionTypes.MUTIPLE_DELETE_MUSIC_ITEM: // 多选状态下删除
      const newdelarr = state.mutiplearr.slice();
      state.mymusicIndex.map(id => {
        if (state.mymusicentities[id] !== undefined) {
          newdelarr.map(item => {
            state.mymusicentities[id].list.map((value, idx) => {
              if (value == item)
                {state.mymusicentities[id].list.splice(idx,1);}
              state.mutiplearr = [];
            });
          });
        }
      });
      return {
        ...state
      };
    case ActionTypes.CHANGE_MUSIC_NAME: // 重命名
      // 有plp标记的音乐不能被重命名
      if (state.listentities[state.musicchooseId].plp == undefined) {
        state.listentities[state.musicchooseId].name = action.value;
      } else {
        alert('本首音乐暂不支持重命名');
      }
      return {
        ...state
      };
    case ActionTypes.CHANGE_MARK_TIME: // 更改标记时间
      state.listentities[state.musicchooseId].bmt = action.start;
      state.listentities[state.musicchooseId].emt = action.end;
      return {
        ...state
      };
    default:
      return state;
  }
}
