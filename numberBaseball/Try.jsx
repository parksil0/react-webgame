import React, { Component } from 'react';

class Try extends Component {
  render () {
    return (
      // 리액트는 key를 보고 같은 컴포넌트인지 아닌지 여부를 확인한다.
      <li>
        <b>{this.props.tryInfo.try}</b> - {this.props.tryInfo.result}
      </li>
    )
  }
}

export default Try;