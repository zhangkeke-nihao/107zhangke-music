import React, { Component } from 'react';
import ReName from '../ReName/ReName';
import DialogMask from '../DialogMask/DialogMask';
import Delete from '../Delete/Delete';
import MusicPlay from '../musicPlay/musicPlay';
import ChoosePart from '../choosepart/ChoosePart';
import './footer.css';
import * as icon from '../../const/icon';

export default class Footer extends Component {
  // 渲染送音乐页面
  handleGiveMusic = () => {
    const { isSingleChoice, musicdata } = this.props;
    const newmymusicdata = musicdata.mymusicIndex.map(id => {
      if (musicdata.mymusicentities[id] !== undefined) {
        return musicdata.mymusicentities[id].list.map(item => {
          if (isSingleChoice == true && musicdata.musicchooseId == musicdata.listentities[item].id) {
            return (alert(`送出【${musicdata.listentities[item].name}】音乐`));
          }
          return null;
        });
      }
      return null;
    });
    return newmymusicdata;
  }
  // 渲染底部页面
  renderFooterItem = () => {
    const {
      isSingleChoice, isMultipleChoice, musicdata
    } = this.props;
    // 单选状态下
    if (isSingleChoice == true) {
      if (!musicdata.musicchooseId) {
        return (
          <div className="footer-wrap">
            <div className="item">
              <img className="icon" src={icon.icon6} alt=" " />
              <div className="botname">播放</div>
            </div>
            <div className="item">
              <img className="icon" src={icon.icon7} alt=" " />
              <div className="botname">重命名</div>
            </div>
            <div className="item">
              <img className="icon" src={icon.icon8} alt=" " />
              <div className="botname">选择片段</div>
            </div>
            <div className="item">
              <img className="icon" src={icon.icon9} alt=" " />
              <div className="botname">送给朋友</div>
            </div>
            <div className="item">
              <img className="icon" src={icon.icon10} alt=" " />
              <div className="botname">删除</div>
            </div>
          </div>
        );
      }
      // 点击推荐音乐
      if (musicdata.recommendIndex.indexOf(musicdata.musicchooseId) + 1) {
        return (
          <div className="footer-wrap">
            <div className="item" onClick={this.props.onPlayShow}>
              <img className="icon" src={icon.icon1} alt=" " />
              <div className="botname" style={{ color: '#000' }}>播放</div>
            </div>
            <div className="item">
              <img className="icon" src={icon.icon7} alt=" " />
              <div className="botname">重命名</div>
            </div>
            <div className="item">
              <img className="icon" src={icon.icon8} alt=" " />
              <div className="botname">选择片段</div>
            </div>
            <div className="item">
              <img className="icon" src={icon.icon9} alt=" " />
              <div className="botname">送给朋友</div>
            </div>
            <div className="item">
              <img className="icon" src={icon.icon10} alt=" " />
              <div className="botname">删除</div>
            </div>
          </div>
        );
      }
      // 点击我的音乐
      return (
        <div className="footer-wrap">
          <div className="item" onClick={this.props.onPlayShow}>
            <img className="icon" src={icon.icon1} alt=" " />
            <div className="botname" style={{ color: '#000' }}>播放</div>
          </div>
          <div className="item" onClick={this.props.onReNameShow}>
            <img className="icon" src={icon.icon2} alt=" " />
            <div className="botname" style={{ color: '#000' }}>重命名</div>
          </div>
          <div className="item" onClick={this.props.onChooseShow}>
            <img className="icon" src={icon.icon3} alt=" " />
            <div className="botname" style={{ color: '#000' }}>选择片段</div>
          </div>
          <div className="item" onClick={this.handleGiveMusic}>
            <img className="icon" src={icon.icon4} alt=" " />
            <div className="botname" style={{ color: '#000' }}>送给朋友</div>
          </div>
          <div className="item" onClick={this.props.onSingleDeleteShow}>
            <img className="icon" src={icon.icon5} alt=" " />
            <div className="botname" style={{ color: '#000' }}>删除</div>
          </div>
        </div>
      );
    } else if (isMultipleChoice == true) { // 多选状态下
      if (musicdata.mutiplearr.length == 0) {
        return (
          <div className="footer-wrap">
            <div className="item">
              <img className="icon" src={icon.icon6} alt=" " />
              <div className="botname">播放</div>
            </div>
            <div className="item">
              <img className="icon" src={icon.icon7} alt=" " />
              <div className="botname">重命名</div>
            </div>
            <div className="item">
              <img className="icon" src={icon.icon8} alt=" " />
              <div className="botname">选择片段</div>
            </div>
            <div className="item">
              <img className="icon" src={icon.icon9} alt=" " />
              <div className="botname">送给朋友</div>
            </div>
            <div className="item">
              <img className="icon" src={icon.icon10} alt=" " />
              <div className="botname">删除</div>
            </div>
          </div>
        );
      } else if (musicdata.mutiplearr.length > 0) {
        const newdelete = musicdata.mutiplearr.map((item, idx) => {
          if (musicdata.recommendIndex.indexOf(item) + 1) {
            return (
              <div key={idx} className="footer-wrap">
                <div className="item">
                  <img className="icon" src={icon.icon6} alt=" " />
                  <div className="botname">播放</div>
                </div>
                <div className="item">
                  <img className="icon" src={icon.icon7} alt=" " />
                  <div className="botname">重命名</div>
                </div>
                <div className="item">
                  <img className="icon" src={icon.icon8} alt=" " />
                  <div className="botname">选择片段</div>
                </div>
                <div className="item">
                  <img className="icon" src={icon.icon9} alt=" " />
                  <div className="botname">送给朋友</div>
                </div>
                <div className="item" onClick={() => alert('推荐音乐不能删除')}>
                  <img className="icon" src={icon.icon10} alt=" " />
                  <div className="botname">删除</div>
                </div>
              </div>
            );
          }
          if (!musicdata.recommendIndex.indexOf(item) + 1) {
            return (
              <div key={idx} className="footer-wrap">
                <div className="item">
                  <img className="icon" src={icon.icon6} alt=" " />
                  <div className="botname">播放</div>
                </div>
                <div className="item">
                  <img className="icon" src={icon.icon7} alt=" " />
                  <div className="botname">重命名</div>
                </div>
                <div className="item">
                  <img className="icon" src={icon.icon8} alt=" " />
                  <div className="botname">选择片段</div>
                </div>
                <div className="item">
                  <img className="icon" src={icon.icon9} alt=" " />
                  <div className="botname">送给朋友</div>
                </div>
                <div className="item" onClick={this.props.onMutipleDeleteShow}>
                  <img className="icon" src={icon.icon5} alt=" " />
                  <div className="botname" style={{ color: '#000' }}>删除</div>
                </div>
              </div>
            );
          }
          return null;
        });
        return newdelete;
      }
    }

    // 既不是单选也不是多选状态
    return (
      <div className="footer-wrap">
        <div className="item">
          <img className="icon" src={icon.icon6} alt=" " />
          <div className="botname">播放</div>
        </div>
        <div className="item">
          <img className="icon" src={icon.icon7} alt=" " />
          <div className="botname">重命名</div>
        </div>
        <div className="item">
          <img className="icon" src={icon.icon8} alt=" " />
          <div className="botname">选择片段</div>
        </div>
        <div className="item">
          <img className="icon" src={icon.icon9} alt=" " />
          <div className="botname">送给朋友</div>
        </div>
        <div className="item">
          <img className="icon" src={icon.icon10} alt=" " />
          <div className="botname">删除</div>
        </div>
      </div>);
  }

  render() {
    return (
      <div>
        {this.renderFooterItem()}
        <DialogMask
          onCancle={this.props.onCancle}
          isActive={this.props.isActive}
        />
        <ReName
          Actions={this.props.Actions}
          musicdata={this.props.musicdata}
          isSingleChoice={this.props.isSingleChoice}
          isRenameActive={this.props.isRenameActive}
          onCancle={this.props.onCancle}
        />
        <MusicPlay
          musicdata={this.props.musicdata}
          isSingleChoice={this.props.isSingleChoice}
          isPlayActive={this.props.isPlayActive}
          onCancle={this.props.onCancle}
        />
        <ChoosePart
          musicdata={this.props.musicdata}
          isSingleChoice={this.props.isSingleChoice}
          isChooseActive={this.props.isChooseActive}
          onCancle={this.props.onCancle}
          Actions={this.props.Actions}
        />
        <Delete
          Actions={this.props.Actions}
          musicdata={this.props.musicdata}
          isSingleChoice={this.props.isSingleChoice}
          isSingleDelete={this.props.isSingleDelete}
          isMultipleChoice={this.props.isMultipleChoice}
          isMutipleDelete={this.props.isMutipleDelete}
          onCancle={this.props.onCancle}
        />
      </div>
    );
  }
}

