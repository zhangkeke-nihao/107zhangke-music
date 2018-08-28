import React, { Component } from 'react';
import './Delete.css';

export default class MutipleDelete extends Component {
  // 得到单选状态下删除的className
  getSingleDeleteClassName = () => {
    if (!this.props.isSingleDelete) {
      return 'delete hide';
    }
    return 'delete show';
  }
  // 得到点击多选状态下删除时的className
  getMutipleDeleteClassName = () => {
    if (!this.props.isMutipleDelete) {
      return 'delete hide';
    }
    return 'delete show';
  }
  // 点击单选删除
  handleSingleDelete = () => {
    const { Actions, onCancle } = this.props;
    Actions.singledeletemusicitem();
    onCancle();
  }
  // 点击多选删除
  handleMutipleDelete = () => {
    const { Actions, onCancle } = this.props;
    Actions.mutipledeletemusicitem();
    onCancle();
  }
  // 渲染删除页面
  renderDelete = () => {
    const { isSingleChoice, isMultipleChoice, musicdata } = this.props;
    // 多选删除
    if (isMultipleChoice === true && musicdata.mutiplearr) {
      return (
        <div className={this.getMutipleDeleteClassName()}>
          <p>确定删除{musicdata.mutiplearr.length}首音乐吗</p>
          <div className="delete-btn">
            <div className="cancle-btn" onClick={this.props.onCancle}>取消</div>
            <div className="sure-btn" onClick={this.handleMutipleDelete}>确定</div>
          </div>
        </div>);
    } else if (isSingleChoice === true && musicdata.musicchooseId) { // 单选删除
      if (isSingleChoice === true && musicdata.musicchooseId === musicdata.listentities[musicdata.musicchooseId].id) {
        return (
          <div className={this.getSingleDeleteClassName()}>
            <p>确定删除【{musicdata.listentities[musicdata.musicchooseId].name}】音乐吗</p>
            <div className="delete-btn">
              <div className="cancle-btn" onClick={this.props.onCancle}>取消</div>
              <div className="sure-btn" onClick={this.handleSingleDelete}>确定</div>
            </div>
          </div>);
      }
    }
    return null;
  }
  render() {
    return (
      <div>
        {this.renderDelete()}
      </div>
    );
  }
}

