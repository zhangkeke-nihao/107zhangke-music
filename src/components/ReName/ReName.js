import React, { Component } from 'react';
import './ReName.css';

export default class ReName extends Component {
  constructor() {
    super();
    this.title = '';
  }
  // 得到点击重命名className
  getReNameMenuClassName= () => {
    if (!this.props.isRenameActive) {
      return 'renamemenu hideMenu';
    }
    return 'renamemenu showMenu';
  }
  // 更新input值
  handleTitleChange = event => {
    this.title = event.target.value;
  }
  // 点击确定
  handleSubmit = () => {
    const { Actions, onCancle } = this.props;
    Actions.changeMusicname(this.title);
    onCancle();
  }
  // 渲染重命名页面
  renderReNameMenuItem = () => {
    const { musicdata, isSingleChoice } = this.props;
    if (musicdata.mymusicIndex) {
      const newmymusicdata = musicdata.mymusicIndex.map(id => {
        if (musicdata.mymusicentities[id] !== undefined) {
          return musicdata.mymusicentities[id].list.map((item, idx) => {
            if (isSingleChoice == true && musicdata.musicchooseId == musicdata.listentities[item].id) {
              return (
                <div key={idx} className={this.getReNameMenuClassName()}>
                  <p>请输入新音乐名称</p>
                  <div className="input-box">
                    <input
                      type="text"
                      defaultValue={musicdata.listentities[item].name}
                      onChange={this.handleTitleChange}
                    />
                  </div>
                  <div className="rename-btn">
                    <div className="cancle-btn" onClick={this.props.onCancle}>取消</div>
                    <div className="sure-btn" onClick={this.handleSubmit}>确定</div>
                  </div>
                </div>
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
      <div>
        {this.renderReNameMenuItem()}
      </div>
    );
  }
}

