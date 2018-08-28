import React, { Component } from 'react';
import './DialogMask.css';

export default class DialogMask extends Component {
  // 得到蒙层className
  getMaskClassName = () => {
    if (!this.props.isActive) {
      return 'dailog-mask dailog-hideMask';
    }
    return 'dailog-mask dailog-showMask';
  }
  render() {
    return (
      <div>
        <div className={this.getMaskClassName()} onClick={this.props.onCancle} />
      </div>
    );
  }
}

