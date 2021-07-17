import React, { PureComponent } from 'react';

// 데이터가 필요없는 경우에는 퓨어 컴포넌트를 상속받는다.
class Ball extends PureComponent {
  render() {
    const { number } = this.props;
    let background;
    if (number <= 10) {
      background = 'red';
    } else if (number <= 20) {
      background = "orange";
    } else if (number <= 30) {
      background = "yellow";
    } else if (number <= 40) {
      background = "blue";
    } else {
      background = "green";
    }
    return (
      <>
        <div className="ball" style={{ background }}>{number}</div>
      </>
    );
  }
}

export default Ball;