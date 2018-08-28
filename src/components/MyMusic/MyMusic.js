import React, { Component } from 'react';
import './MyMusic.css';

export default class MyMusic extends Component {
  renderMymusicItem = () => {
    const {
      musicdata, Actions, isSingleChoice, isMultipleChoice
    } = this.props;
    if (musicdata.mymusicIndex) {
      const newmymusicdata = musicdata.mymusicIndex.map(id => {
        if (musicdata.mymusicentities[id] !== undefined) {
          return musicdata.mymusicentities[id].list.map((item, idx) => {
            // 单选选中我的音乐某一项
            if (isSingleChoice === true && musicdata.musicchooseId === musicdata.listentities[item].id) {
              return (
                <li key={idx} className="divider">
                  <div className="libox">
                    <div className="single-choice-btn show" />
                    <span>{musicdata.listentities[item].name}</span>
                  </div>
                </li>
              );
            }
            // 单选没有选中我的音乐某一项
            if (isSingleChoice === true && musicdata.musicchooseId !== musicdata.listentities[item].id) {
              return (
                <li key={idx} className="divider" onClick={() => Actions.getsinglemusicItemId(musicdata.listentities[item].id)}>
                  <div className="libox">
                    <div className="single-choice-btn" />
                    <span>{musicdata.listentities[item].name}</span>
                  </div>
                </li>
              );
            }
            // 多选选中我的音乐某一项
            if (isMultipleChoice === true && musicdata.mutiplearr.indexOf(musicdata.listentities[item].id) + 1) {
              return (
                <li key={idx} className="divider" onClick={() => Actions.getMutiplemusicItemId(musicdata.listentities[item].id)}>
                  <div className="libox">
                    <div className="mutiple-choice-btn red">
                      <span className="num">{musicdata.mutiplearr.indexOf(musicdata.listentities[item].id) + 1}</span>
                    </div>
                    <span>{musicdata.listentities[item].name}</span>
                  </div>
                </li>
              );
            } else if (isMultipleChoice === true && !musicdata.mutiplearr.indexOf(musicdata.listentities[item].id) + 1) {
              return (// 多选没有选中我的音乐某一项
                <li key={idx} className="divider" onClick={() => Actions.getMutiplemusicItemId(musicdata.listentities[item].id)}>
                  <div className="libox">
                    <div className="mutiple-choice-btn">
                      <span className="num" />
                    </div>
                    <span>{musicdata.listentities[item].name}</span>
                  </div>
                </li>
              );
            } else if (isSingleChoice === false && isMultipleChoice === false) {
              return ( // 既不是单选也不是多选
                <li key={idx} className="divider">
                  <div className="libox">
                    <div className="single-choice-btn" />
                    <span>{musicdata.listentities[item].name}</span>
                  </div>
                </li>
              );
            }
            return null;
          });
        }
        return null;
      });
      return newmymusicdata;
    }
    return null;
  }
  render() {
    return (
      <div className="music-wrap">
        <div className="music-title divider">
          <div>
            <h2>我的音乐</h2>
            <span>瓶子</span>
          </div>
        </div>
        <ul>
          {this.renderMymusicItem()}
        </ul>
      </div>
    );
  }
}
