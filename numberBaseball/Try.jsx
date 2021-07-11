import React, { PureComponent } from 'react';

class Try extends PureComponent {
  render() {
    const { tryInfo } = this.props;
    return (
      <li>
        <b>{tryInfo.try}</b> - {tryInfo.result}
      </li>
    )
  }
}

// class Try extends Component {
//   render () {
//     return (
//       // 리액트는 key를 보고 같은 컴포넌트인지 아닌지 여부를 확인한다.
//       <li>
//         <b>{this.props.tryInfo.try}</b> - {this.props.tryInfo.result}
//       </li>
//     )
//   }
// }

export default Try;