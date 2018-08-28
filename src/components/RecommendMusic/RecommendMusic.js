import React, { Component } from 'react';
import './RecommendMusic.css';

export default class RecommendMusic extends Component {
  state = { }
  renderRecommendItem = () => {
    const {
      musicdata, Actions, isSingleChoice, isMultipleChoice
    } = this.props;
    const newcommendata = musicdata.recommendIndex.map(id => musicdata.recommendentities[id]);
    if (newcommendata) {
      const recommendmsg = newcommendata.map((item, idx) => {
        if (isSingleChoice === false && isMultipleChoice === false) {
          return (
            <li key={idx} className="divider">
              <div className="libox">
                <div className="single-choice-btn" />
                <span>{item.name}</span>
              </div>
            </li>);
        }
        // 单选选中推荐音乐某一项
        if (isSingleChoice === true && musicdata.musicchooseId === item.id) {
          return (
            <li key={idx} className="divider">
              <div className="libox">
                <div className="single-choice-btn show" />
                <span>{item.name}</span>
              </div>
            </li>);
        }
        // 单选没有选中推荐音乐某一项
        if (isSingleChoice === true && musicdata.musicchooseId !== item.id) {
          return (
            <li key={idx} className="divider" onClick={() => Actions.getsinglemusicItemId(item.id)}>
              <div className="libox">
                <div className="single-choice-btn" />
                <span>{item.name}</span>
              </div>
            </li>);
        }
        // 多选选中推荐音乐某一项
        if (musicdata.mutiplearr.indexOf(item.id) + 1) {
          return (
            <li key={idx} className="divider" onClick={() => Actions.getMutiplemusicItemId(item.id)}>
              <div className="libox">
                <div className="mutiple-choice-btn red">
                  <span className="num">{musicdata.mutiplearr.indexOf(item.id) + 1}</span>
                </div>
                <span>{item.name}</span>
              </div>
            </li>);
        }
        // 多选没有选中推荐音乐某一项
        return (
          <li key={idx} className="divider" onClick={() => Actions.getMutiplemusicItemId(item.id)}>
            <div className="libox">
              <div className="mutiple-choice-btn" />
              <span>{item.name}</span>
            </div>
          </li>
        );
      });
      return recommendmsg;
    }
    return null;
  };
  render() {
    return (
      <div className="music-wrap">
        <div className="music-title divider">
          <div>
            <h2>推荐音乐</h2>
          </div>
        </div>
        <ul>
          {this.renderRecommendItem()}
        </ul>
      </div>
    );
  }
}
