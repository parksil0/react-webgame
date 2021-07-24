import React, { Component } from 'react';
import NumberBaseball from "../numberBaseball/NumberBaseball";
import RSP from "../rsp/RSP";
import Lotto from "../lotto/Lotto";

class GameMatcher extends Component {
  render() {
    const paramsName = this.props.match.params.name;
    if (paramsName === "number-baseball") {
      return <NumberBaseball />
    } else if (paramsName === "rock-scissors-paper") {
      return <RSP />
    } else if (paramsName === "lotto-generator") {
      return <Lotto />
    }
    return (
      <div>
        일치하는 게임이 없습니다.
      </div>
    );
  }
}

export default GameMatcher;