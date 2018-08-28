import React, { Component } from 'react';
import './buttonchoose.css';

export default class ButtonChoose extends Component {
  // 点击单选得到的classNmae
  getSingleChoiceeClass = () => {
    const { isSingleChoice } = this.props;
    if (isSingleChoice) {
      return 'choose chosenred';
    }
    return 'choose';
  }
  // 点击多选得到的classNmae
  getMultipleChoiceeClass = () => {
    const { isMultipleChoice } = this.props;
    if (isMultipleChoice) {
      return 'choose chosenred';
    }
    return 'choose';
  }
  render() {
    const { Actions } = this.props;
    return (
      <div className="button-wrap">
        <div onClick={this.props.onSingleChoiceClick}>
          <span className={this.getSingleChoiceeClass()} onClick={() => { Actions.singleclick(); }} />
          <span className="choose-single-word">单选</span>
        </div>
        <div className="choose-box">
          <div onClick={this.props.onMultipleChoiceClick}>
            <span className={this.getMultipleChoiceeClass()} onClick={() => { Actions.mutipleclick(); }} />
            <span className="choose-mutiple-word">多选</span>
          </div>
        </div>
      </div>
    );
  }
}
