import React, { Component } from 'react';
import './ChoosePart.css';
import * as icon from '../../const/icon';

export default class ChoosePart extends Component {
  state = {
    isPlay: false,
    allTime: 0,
    currentTime: 0,
    isMove: false,
    MarkStartTime: 0,
    MarkEndTime: 0,
    isMarkStart: false,
    isMarkEnd: false
  };

  // 得到点击选择片段放className
  getChooseMenuClassName = () => {
    if (!this.props.isChooseActive) {
      return 'choosemenu hideMenu';
    }
    return 'choosemenu showMenu';
  }
  // 得到点击标记起点后className
  getStartClassName = () => {
    if (!this.state.MarkStartTime) {
      return 'speeds-start hide';
    }
    return 'speeds-start show';
  }
  // 得到点击标记终点后className
  getEndClassName = () => {
    if (!this.state.MarkEndTime) {
      return 'speeds-end hide';
    }
    return 'speeds-end show';
  }
  // 点击标记起点
  handleMarkStartTime = () => {
    this.setState({
      MarkStartTime: this.audioValue.currentTime,
      isMarkStart: true
    });
  }
  // 点击标记终点
  handleMarkEndTime = () => {
    if (!this.state.MarkStartTime) {
      alert('请先标记起点');
    } else if (this.audioValue.currentTime - this.state.MarkStartTime < 10) {
      alert('时间间隔不足10秒，暂时不能标记');
    } else {
      this.setState({
        MarkEndTime: this.audioValue.currentTime,
        isMarkEnd: true
      });
    }
  }
  // 点击清除标记
  handleClearMark = () => {
    this.setState({
      MarkStartTime: 0,
      MarkEndTime: 0,
      isMarkStart: false,
      isMarkEnd: false
    });
  }
  // 点击完成，清除现有标记，发action修改原数据的bmt、emt
  handleFinishMark = () => {
    const { Actions, onCancle } = this.props;
    Actions.changemark(this.state.MarkStartTime, this.state.MarkEndTime);
    this.setState({
      isMarkStart: false,
      isMarkEnd: false,
      MarkStartTime: 0,
      MarkEndTime: 0
    });
    onCancle();
  }
  TouchStart = e => {
    e.preventDefault();
    this.startX = e.changedTouches[0].clientX;
    this.setState({ isMove: true });
  }
  TouchMove = e => {
    const { musicdata } = this.props;
    e.preventDefault();
    this.endX = e.changedTouches[0].clientX;
    if (this.endX > 360) {
      this.endX = 360;
    }
    if (this.endX < 80) {
      this.endX = 80;
    }
    if (!(musicdata.recommendIndex.indexOf(musicdata.musicchooseId) + 1)) {
      if (musicdata.listentities[musicdata.musicchooseId].bmt != 0
        && this.endX < (musicdata.listentities[musicdata.musicchooseId].bmt) / this.state.allTime * 284 + 80) {
        this.endX = (musicdata.listentities[musicdata.musicchooseId].bmt) / this.state.allTime * 284 + 80;
      }
      if (musicdata.listentities[musicdata.musicchooseId].emt != 0
        && this.endX > (musicdata.listentities[musicdata.musicchooseId].emt) / this.state.allTime * 284 + 80) {
        this.endX = (musicdata.listentities[musicdata.musicchooseId].emt) / this.state.allTime * 284 + 80;
      }
    }
    const x = this.endX - this.startX;
    const currenttime = (x / 284) * this.state.allTime;
    this.setState({ currentTime: this.audioValue.currentTime + currenttime });
  }
  TouchEnd = e => {
    e.preventDefault();
    this.audioValue.currentTime = this.state.currentTime;
    this.setState({ isMove: false });
  }

  millisecondToDate(time) { // 毫秒数换算
    const second = Math.floor(time % 60);
    const minite = Math.floor(time / 60);
    return `${minite}:${second >= 10 ? second : `0${second}`}`;
  }
  controlAudio(type) {
    const { musicdata } = this.props;
    switch (type) {
      case 'allTime': // 所有时间 duration：获取媒体文件的播放时长
        this.setState({
          allTime: this.audioValue.duration
        });
        break;
      case 'play': // 播放
        this.audioValue.play();
        this.setState({
          isPlay: true
        });
        break;
      case 'pause': // 暂停
        this.audioValue.pause();
        this.setState({
          isPlay: false
        });
        break;
      case 'getCurrentTime': // 获取当前时间
        if (this.state.isMove == false) {
          // 有开始标记且当前时间小于开始标记时间，当前时间=开始标记时间
          if (this.state.MarkStartTime != 0 && this.audioValue.currentTime < this.state.MarkStartTime) {
            this.audioValue.currentTime = this.state.MarkStartTime;
          }
          if (this.state.MarkEndTime != 0 && this.audioValue.currentTime > this.state.MarkEndTime) {
            this.audioValue.currentTime = this.state.MarkStartTime;
          }
          if (this.state.MarkStartTime != 0 && this.audioValue.currentTime == this.state.MarkEndTime) {
            this.setState({
              currentTime: this.state.MarkStartTime
            });
            this.audioValue.currentTime = this.state.MarkStartTime;
          }
          if (musicdata.listentities[musicdata.musicchooseId].bmt != 0
            && this.audioValue.currentTime < musicdata.listentities[musicdata.musicchooseId].bmt) {
            this.audioValue.currentTime = musicdata.listentities[musicdata.musicchooseId].bmt;
          }
          if (musicdata.listentities[musicdata.musicchooseId].emt != 0
            && this.audioValue.currentTime > musicdata.listentities[musicdata.musicchooseId].emt) {
            this.audioValue.currentTime = musicdata.listentities[musicdata.musicchooseId].bmt;
          }
          if (musicdata.listentities[musicdata.musicchooseId].bmt != 0
            && this.audioValue.currentTime == musicdata.listentities[musicdata.musicchooseId].emt) {
            this.setState({
              currentTime: musicdata.listentities[musicdata.musicchooseId].bmt
            });
            this.audioValue.currentTime = musicdata.listentities[musicdata.musicchooseId].bmt;
          }
          this.setState({
            currentTime: this.audioValue.currentTime
          });
          if (this.audioValue.currentTime == this.audioValue.duration) {
            this.setState({
              isPlay: false
            });
          }
        }
        break;
      default:
        break;
    }
  }
  // 渲染打标记
  renderCut = () => {
    const { allTime, currentTime } = this.state;
    if (this.state.isMarkStart == false && this.state.isMarkEnd == false) {
      return (
        <div className="cut-wrap">
          <div onClick={this.handleMarkStartTime}>
            <div><img src={icon.iconcutstart1} /></div>
            <div className="cut-word">标记起点</div>
            <div className="startTime">{this.millisecondToDate(currentTime)}</div>
          </div>
          <div className="cut-wrap-clear" onClick={this.handleClearMark}>
            <div><img src={icon.iconcut1} /></div>
            <div className="cut-word">清除</div>
          </div>
          <div onClick={this.handleMarkEndTime}>
            <div><img src={icon.iconcutend1} /></div>
            <div className="cut-word">标记终点</div>
            <div className="endTime">{this.millisecondToDate(allTime)}</div>
          </div>
        </div>
      );
    } else if (this.state.isMarkStart == true && this.state.isMarkEnd == false) {
      return (
        <div className="cut-wrap">
          <div>
            <div><img src={icon.iconcutstart2} /></div>
            <div className="cut-word">标记起点</div>
            <div className="startTime">{this.millisecondToDate(currentTime)}</div>
          </div>
          <div className="cut-wrap-clear" onClick={this.handleClearMark}>
            <div><img src={icon.iconcut1} /></div>
            <div className="cut-word">清除</div>
          </div>
          <div onClick={this.handleMarkEndTime}>
            <div><img src={icon.iconcutend1} /></div>
            <div className="cut-word">标记终点</div>
            <div className="endTime">{this.millisecondToDate(allTime)}</div>
          </div>
        </div>);
    }
    return (
      <div className="cut-wrap">
        <div>
          <div><img src={icon.iconcutstart2} /></div>
          <div className="cut-word">标记起点</div>
          <div className="startTime">{this.millisecondToDate(currentTime)}</div>
        </div>
        <div className="cut-wrap-clear" onClick={this.handleClearMark}>
          <div><img src={icon.iconcut1} /></div>
          <div className="cut-word">清除</div>
        </div>
        <div>
          <div><img src={icon.iconcutend2} /></div>
          <div className="cut-word">标记终点</div>
          <div className="endTime">{this.millisecondToDate(allTime)}</div>
        </div>
      </div>
    );
  }
  // 渲染打前后标记
  renderMarkImg = () => {
    const { musicdata } = this.props;
    const {
      allTime, currentTime, MarkStartTime, MarkEndTime
    } = this.state;
    const play_time = currentTime / allTime * 100;
    const start_time = MarkStartTime / allTime * 100;
    const end_time = MarkEndTime / allTime * 100;
    const start = musicdata.listentities[musicdata.musicchooseId].bmt / allTime * 100;
    if (musicdata.listentities[musicdata.musicchooseId].id == musicdata.musicchooseId) {
      if (this.state.isMarkStart == false && this.state.isMarkEnd == false) {
        return (
          <div className="Playback_progress">
            <div
              className="speeds_motion_mask"
              style={{ width: `${start}%` }}
            />
            <div
              className="speeds_motion"
              type="range"
              style={{ width: `${play_time}%` }}
            />
            <div
              className="speeds-btn"
              style={{ left: `${play_time - 2}%` }}
              onTouchStart={this.TouchStart}
              onTouchEnd={this.TouchEnd}
              onTouchMove={this.TouchMove}
            />
            {this.renderPlayMark()}
          </div>
        );
      }
      return (
        <div className="Playback_progress">
          <div
            className="speeds_motion_mask"
            style={{ width: `${start}%` }}
          />
          <div
            className="speeds_motion"
            type="range"
            style={{ width: `${play_time}%` }}
          />
          <div
            className="speeds-btn"
            style={{ left: `${play_time - 2}%` }}
            onTouchStart={this.TouchStart}
            onTouchEnd={this.TouchEnd}
            onTouchMove={this.TouchMove}
          />
          <div className={this.getStartClassName()}>
            <img
              style={{ left: `${start_time - 2}%` }}
              src={icon.iconcutstart3}
            />
          </div>
          <div className={this.getEndClassName()} >
            <img
              style={{ left: `${end_time - 2}%` }}
              src={icon.iconcutend3}
            />
          </div>
        </div>
      );
    }
    return null;
  }
  // 渲染前后标记
  renderPlayMark = () => {
    const { musicdata, isSingleChoice } = this.props;
    const { allTime } = this.state;
    const progressMark = musicdata.mymusicIndex.map(id => {
      if (musicdata.mymusicentities[id] !== undefined) {
        return musicdata.mymusicentities[id].list.map((item, idx) => {
          if (isSingleChoice == true && musicdata.musicchooseId == musicdata.listentities[item].id) {
            // 起始时间（bmt）和终止时间（emt）不为0时，需要在播放进度条（截取时）标记起止点
            if (musicdata.listentities[item].bmt && musicdata.listentities[item].emt) {
              const start_time = musicdata.listentities[item].bmt / allTime * 100;
              const end_time = musicdata.listentities[item].emt / allTime * 100;
              return (
                <div key={idx}>
                  <div className="speeds-start">
                    <img
                      style={{ left: `${start_time - 2}%` }}
                      src={icon.iconcutstart3}
                    />
                  </div>
                  <div className="speeds-end">
                    <img
                      style={{ left: `${end_time - 2}%` }}
                      src={icon.iconcutend3}
                    />
                  </div>
                </div>
              );
            }
            return null;
          }
          return null;
        });
      }
      return null;
    });
    return progressMark;
  }
  // 渲染选择片段dialog
  renderChooseMenuItem = () => {
    const { isPlay, allTime, currentTime } = this.state;
    const { musicdata, isSingleChoice } = this.props;
    if (musicdata.mymusicIndex) {
      const newmymusicdata = musicdata.mymusicIndex.map(id => {
        if (musicdata.mymusicentities[id] !== undefined) {
          return musicdata.mymusicentities[id].list.map((item, idx) => {
            if (isSingleChoice == true && musicdata.musicchooseId == musicdata.listentities[item].id) {
              return (
                <div key={idx} className={this.getChooseMenuClassName()}>
                  {this.renderCut()}
                  <div className="play">
                    <audio
                      preload="true"
                      onCanPlay={() => this.controlAudio('allTime')}
                      onTimeUpdate={() => this.controlAudio('getCurrentTime')}
                      ref={audio => { this.audioValue = audio; }}
                    >
                      <source src={musicdata.listentities[item].m_url} type="audio/mp3" />
                    </audio>

                    <div className="audio-img" >
                      <img
                        onClick={() => this.controlAudio(isPlay ? 'pause' : 'play')}
                        src={this.state.isPlay ? icon.iconpause : icon.iconplay}
                      />
                    </div>
                    {this.renderMarkImg()}
                  </div>
                  <div className="choose-times">
                    <span className="startTime">{this.millisecondToDate(currentTime)}/</span>
                    <span className="endTime">{this.millisecondToDate(allTime)}</span>
                  </div>
                  <div className="finished" onClick={this.handleFinishMark}>完成</div>
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
        {this.renderChooseMenuItem()}
      </div>
    );
  }
}

