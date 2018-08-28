import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../action/index';
import HeadWarpper from '../../components/HeadWarpper/HeadWarpper';


class AppWarpper extends Component {
  componentDidMount() {
    const { Actions } = this.props;
    const mid = 107;
    Actions.fetchLoginInfo(mid);
  }
  render() {
    const { children } = this.props;
    return (
      <div>
        <HeadWarpper title={this.props.logindata.title} />
        {children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { logindata } = state;
  const props = { logindata };
  return props;
}

const mapDispatchToProps = dispatch => ({
  Actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWarpper);
