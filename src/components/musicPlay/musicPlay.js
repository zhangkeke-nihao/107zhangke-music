import React, { Component } from 'react';
import './MusicPlay.css';
import * as icon from '../../const/icon';

export default class MusicPlay extends Component {
  state = {
    isPlay: false,
    allTime: 0,
    currentTime: 0,
    isMove: false
  };
  // 得到点击播放className
  getPlayMenuClassName= () => {
    if (!this.props.isPlayActive) {
      return 'menu hideMenu';
    }
    return 'menu showMenu';
  }

  getcommendCurrentTime = () => { // 获取推荐音乐当前时间
    this.setState({
      currentTime: this.audioValue.currentTime
    });
    if (this.audioValue.currentTime === this.audioValue.duration) {
      this.setState({
        isPlay: false
      });
    }
  }
  millisecondToDate(time) { // 毫秒数换算
    const second = Math.floor(time % 60);
    const minute = Math.floor(time / 60);
    return `${minute}:${second >= 10 ? second : `0${second}`}`;
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
      if (musicdata.listentities[musicdata.musicchooseId].bmt !== 0
        && this.endX < (musicdata.listentities[musicdata.musicchooseId].bmt) / this.state.allTime * 284 + 80) {
        this.endX = (musicdata.listentities[musicdata.musicchooseId].bmt) / this.state.allTime * 284 + 80;
      }
      if (musicdata.listentities[musicdata.musicchooseId].emt !== 0
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
  controlAudio(type) {
    const { musicdata } = this.props;
    switch (type) {
      case 'allTime': // 所有时间 duration：获取媒体文件的播放时长，以s为单位，如果无法获取，则为NaN
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
      case 'getCurrentTime': // 获取我的音乐当前时间
        if (this.state.isMove === false) {
          if (musicdata.listentities[musicdata.musicchooseId].bmt !== 0
            && this.audioValue.currentTime < musicdata.listentities[musicdata.musicchooseId].bmt) {
            this.audioValue.currentTime = musicdata.listentities[musicdata.musicchooseId].bmt;
          }
          if (musicdata.listentities[musicdata.musicchooseId].bmt !== 0
            && this.audioValue.currentTime === musicdata.listentities[musicdata.musicchooseId].emt) {
            this.setState({
              currentTime: musicdata.listentities[musicdata.musicchooseId].bmt
            });
            this.audioValue.currentTime = musicdata.listentities[musicdata.musicchooseId].bmt;
          }
          if (musicdata.listentities[musicdata.musicchooseId].emt !== 0
            && this.audioValue.currentTime > musicdata.listentities[musicdata.musicchooseId].emt) {
            this.audioValue.currentTime = musicdata.listentities[musicdata.musicchooseId].bmt;
          }
          this.setState({
            currentTime: this.audioValue.currentTime
          });
          if (this.audioValue.currentTime === this.audioValue.duration) {
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

  // 渲染前后标记
  renderPlayMark = () => {
    const { musicdata } = this.props;
    const { allTime } = this.state;
    // 起始时间（bmt）和终止时间（emt）不为0时，需要在播放进度条（截取时）标记起止点
    if (musicdata.listentities[musicdata.musicchooseId].bmt && musicdata.listentities[musicdata.musicchooseId].emt) {
      const start_time = musicdata.listentities[musicdata.musicchooseId].bmt / allTime * 100;
      const end_time = musicdata.listentities[musicdata.musicchooseId].emt / allTime * 100;
      return (
        <div>
          <div className="speeds-start">
            <img
              style={{ left: `${start_time - 2}%` }}
              src={icon.iconcutstart3}
              alt="#"
            />
          </div>
          <div className="speeds-end">
            <img
              style={{ left: `${end_time - 2}%` }}
              src={icon.iconcutend3}
              alt="#"
            />
          </div>
        </div>
      );
    }
    return null;
  }
  // 渲染播放
  renderPlayMenuItem = () => {
    const { musicdata, isSingleChoice } = this.props;
    const {
      isPlay, allTime, currentTime
    } = this.state;
    const play_time = currentTime / allTime * 100;

    // 推荐音乐
    if (musicdata.recommendIndex.indexOf(musicdata.musicchooseId) + 1) {
      const newcommendata = musicdata.recommendIndex.map((id, idx) => {
        if (isSingleChoice === true && musicdata.musicchooseId === musicdata.recommendentities[id].id) {
          return (
            <div key={idx} className={this.getPlayMenuClassName()}>
              <div className="close" onClick={this.props.onCancle}>关闭</div>
              <div className="name">{musicdata.recommendentities[id].name}</div>
              <div className="times">
                <span className="startTime">{this.millisecondToDate(currentTime)}/</span>
                <span className="endTime">{this.millisecondToDate(allTime)}</span>
              </div>

              <div className="play">
                <audio
                  onCanPlay={() => this.controlAudio('allTime')}
                  onTimeUpdate={() => this.getcommendCurrentTime()}
                  ref={audio => { this.audioValue = audio; }}
                >
                  <source src={musicdata.recommendentities[id].m_url} type="audio/mp3" />
                </audio>
                <div className="audio-img" >
                  <img
                    onClick={() => this.controlAudio(isPlay ? 'pause' : 'play')}
                    src={this.state.isPlay ? icon.iconpause : icon.iconplay}
                    alt="#"
                  />
                </div>
                <div className="Playback_progress">
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
                </div>
              </div>
            </div>
          );
        }
        return null;
      });
      return newcommendata;
    }
    // 我的音乐
    const newmymusicdata = musicdata.mymusicIndex.map(id => {
      if (musicdata.mymusicentities[id] !== undefined) {
        return musicdata.mymusicentities[id].list.map((item, idx) => {
          if (isSingleChoice === true && musicdata.musicchooseId === musicdata.listentities[item].id) {
            const start = musicdata.listentities[musicdata.musicchooseId].bmt / allTime * 100;
            return (
              <div key={idx} className={this.getPlayMenuClassName()}>
                <div className="close" onClick={this.props.onCancle}>关闭</div>
                <div className="name">{musicdata.listentities[item].name}</div>
                <div className="times">
                  <span className="startTime">{this.millisecondToDate(currentTime)}/</span>
                  <span className="endTime">{this.millisecondToDate(allTime)}</span>
                </div>

                <div className="play">
                  <audio
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
                      alt="#"
                    />
                  </div>
                  <div
                    key={idx}
                    className="Playback_progress"
                  >
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
                      type="range"
                      step="0.01"
                      max={allTime}
                      value={currentTime}
                      style={{ left: `${play_time - 2}%` }}
                      onTouchStart={this.TouchStart}
                      onTouchEnd={this.TouchEnd}
                      onTouchMove={this.TouchMove}
                    />
                    {this.renderPlayMark()}
                  </div>
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

  render() {
    return (
      <div>
        {this.renderPlayMenuItem()}
      </div>
    );
  }
}

