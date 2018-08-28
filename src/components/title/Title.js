import React, { Component } from 'react';
import './title.css';

const icon = require('../../icons/return.png');

export default class Title extends Component {
  state = { }

  render() {
    return (
      <div className="head">
        <div className="head-wrap">
          <div onClick={() => alert('Go Back')}>
            <img className="back-img" src={icon} alt="" />
            <span className="back-name">我</span>
          </div>
          <div className="title">{this.props.title}</div>
          <div>完成</div>
        </div>
      </div>
    );
  }
}

