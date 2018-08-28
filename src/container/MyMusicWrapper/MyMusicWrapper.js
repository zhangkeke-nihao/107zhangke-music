import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../action/index';
import ButtonChoose from '../../components/ButtonChoose/ButtonChoose';
import MyMusic from '../../components/MyMusic/MyMusic';
import RecommendMusic from '../../components/RecommendMusic/RecommendMusic';
import Footer from '../../components/footer/footer';
import './MyMusicWrap.css';


class MyMusicWrapper extends Component {
  state = {
    isSingleChoice: false,
    isMultipleChoice: false,
    isActive: false,
    isPlayActive: false,
    isChooseActive: false,
    isRenameActive: false,
    isSingleDelete: false,
    isMutipleDelete: false
  }
  componentWillMount() {
    const { logindata, Actions } = this.props;
    Actions.fetchMyMusicInfo(logindata.token);
    Actions.fetchRecommendMusicInfo(logindata.token);
  }
  handleSingleChoiceClick = () => { // 点击单选
    const { isSingleChoice } = this.state;
    this.setState({
      isSingleChoice: !isSingleChoice,
      isMultipleChoice: false
    });
  }
  handleMultipleChoiceClick = () => { // 点击多选
    const { isMultipleChoice } = this.state;
    this.setState({
      isMultipleChoice: !isMultipleChoice,
      isSingleChoice: false
    });
  }
  handlePlayshowDialog = () => { // 显示播放dialog
    this.setState({
      isActive: true,
      isPlayActive: true
    });
  }
  handleChooseshowDialog = () => { // 显示选择片段dialog
    this.setState({
      isActive: true,
      isChooseActive: true
    });
  }
  handleReNameshowDialog = () => { // 显示重命名dialog
    this.setState({
      isActive: true,
      isRenameActive: true
    });
  }
  handleSingleDeleteshowDialog = () => { // 显示单选删除dialog
    this.setState({
      isActive: true,
      isSingleDelete: true
    });
  }
  handleMutipleDeleteshowDialog = () => { // 显示多选删除dialog
    this.setState({
      isActive: true,
      isMutipleDelete: true
    });
  }
  handleHideClick = () => { // 关闭dialog
    this.setState({
      isActive: false,
      isPlayActive: false,
      isChooseActive: false,
      isRenameActive: false,
      isSingleDelete: false,
      isMutipleDelete: false
    });
  }
  render() {
    return (
      <div className="body-wrap">
        <ButtonChoose
          onSingleChoiceClick={this.handleSingleChoiceClick}
          onMultipleChoiceClick={this.handleMultipleChoiceClick}
          isSingleChoice={this.state.isSingleChoice}
          isMultipleChoice={this.state.isMultipleChoice}
          Actions={this.props.Actions}
        />
        <MyMusic
          isSingleChoice={this.state.isSingleChoice}
          isMultipleChoice={this.state.isMultipleChoice}
          musicdata={this.props.musicdata}
          Actions={this.props.Actions}
        />
        <RecommendMusic
          isSingleChoice={this.state.isSingleChoice}
          isMultipleChoice={this.state.isMultipleChoice}
          musicdata={this.props.musicdata}
          Actions={this.props.Actions}
        />
        <Footer
          Actions={this.props.Actions}
          musicdata={this.props.musicdata}
          isSingleChoice={this.state.isSingleChoice}
          isMultipleChoice={this.state.isMultipleChoice}
          isActive={this.state.isActive}
          isPlayActive={this.state.isPlayActive}
          isChooseActive={this.state.isChooseActive}
          isRenameActive={this.state.isRenameActive}
          isSingleDelete={this.state.isSingleDelete}
          isMutipleDelete={this.state.isMutipleDelete}
          onPlayShow={this.handlePlayshowDialog}
          onChooseShow={this.handleChooseshowDialog}
          onReNameShow={this.handleReNameshowDialog}
          onSingleDeleteShow={this.handleSingleDeleteshowDialog}
          onMutipleDeleteShow={this.handleMutipleDeleteshowDialog}
          onCancle={this.handleHideClick}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { logindata, musicdata, entities } = state;
  return {
    logindata,
    musicdata,
    entities
  };
}
const mapDispatchToProps = dispatch => ({
  Actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MyMusicWrapper);

