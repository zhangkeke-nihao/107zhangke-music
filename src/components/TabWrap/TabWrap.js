import React, { Component } from 'react';
import { Link } from 'react-router';
import './TabWrap.css';


export default class TabWrap extends Component {
  state = {
    isMymusicLine: true,
    isSerachLine: false,
    isLoadLine: false,
    isMymusicChioce: true,
    isSearchmusicChioce: false,
    isloadmusicChioce: false
  }
  getMymusicLinebarClass = () => {
    const { isMymusicLine } = this.state;
    if (isMymusicLine) {
      return 'line-bar';
    }
    return null;
  }
  getSearchLinebarClass = () => {
    const { isSerachLine } = this.state;
    if (isSerachLine) {
      return 'line-bar';
    }
    return null;
  }
  getLoadLinebarClass = () => {
    const { isLoadLine } = this.state;
    if (isLoadLine) {
      return 'line-bar';
    }
    return null;
  }
  getMymusicClass = () => {
    const { isMymusicChioce } = this.state;
    if (isMymusicChioce) {
      return 'tab-chioce';
    }
    return null;
  }
  getSearchmusicClass = () => {
    const { isSearchmusicChioce } = this.state;
    if (isSearchmusicChioce) {
      return 'tab-chioce';
    }
    return null;
  }
  getLoadmusicClass = () => {
    const { isloadmusicChioce } = this.state;
    if (isloadmusicChioce) {
      return 'tab-chioce';
    }
    return null;
  }
  handleMymusicClick = () => {
    this.setState({
      isMymusicChioce: true,
      isMymusicLine: true,
      isSerachLine: false,
      isLoadLine: false,
      isSearchmusicChioce: false,
      isloadmusicChioce: false
    });
  }
  handleSearchClick = () => {
    this.setState({
      isSearchmusicChioce: true,
      isSerachLine: true,
      isMymusicLine: false,
      isLoadLine: false,
      isMymusicChioce: false,
      isloadmusicChioce: false
    });
  }
  handleLoadClick = () => {
    this.setState({
      isloadmusicChioce: true,
      isLoadLine: true,
      isMymusicLine: false,
      isSerachLine: false,
      isMymusicChioce: false,
      isSearchmusicChioce: false
    });
  }
  render() {
    return (
      <div className="tab-wrap">
        <Link to="/mymusicwrapper" >
          <div className={this.getMymusicClass()} onClick={this.handleMymusicClick}>
            <div>我的音乐</div>
            <div className={this.getMymusicLinebarClass()} />
          </div>
        </Link>
        <Link to="/searchmusic">
          <div className={this.getSearchmusicClass()} onClick={this.handleSearchClick}>
            <div>搜索音乐</div>
            <div className={this.getSearchLinebarClass()} />
          </div>
        </Link>
        <Link to="/uploadmusic">
          <div className={this.getLoadmusicClass()} onClick={this.handleLoadClick}>
            <div>上传音乐</div>
            <div className={this.getLoadLinebarClass()} />
          </div>
        </Link>
      </div>
    );
  }
}
