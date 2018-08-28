import React, { Component } from 'react';
import Title from '../../components/title/Title';
import TabWrap from '../../components/TabWrap/TabWrap';
import './HeadWrapper.css';

export default class HeadWrapper extends Component {
  state = { }

  render() {
    return (
      <div className="head-tab-warp">
        <Title title={this.props.title} />
        <TabWrap />
      </div>
    );
  }
}

