import React, { Component } from 'react';

class ResponseCheck extends Component {
  state = {
    state: 'waiting',
    message: '클릭해서 시작하세요.',
    result: [],
  };
  
  // state에 변수를 등록하면 변경되는 순간 렌더링이 된다.
  // 그렇게 하지 않으려면 state 바깥에 this 변수를 선언하면 된다.
  timeout;
  startTime;
  endTime;

  onClickScreen = () => {
    const { state, message, result } = this.state;
    if (state === 'waiting') {
      this.setState({
        state: 'ready',
        message: '초록색이 되면 클릭하세요.',
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: 'now',
          message: '지금 클릭',
        })
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000) // 2 ~ 3초 랜덤
    } else if (state === 'ready') { // 성급하게 클릭
      clearTimeout(this.timeout)
        this.setState({
          state: "waiting",
          message: "초록색이 된 후에 클릭하세요.",
        });   

    } else if (state === 'now') { // 반응속도 체크
      this.endTime = new Date();
      this.setState((prevState) => {
        return {
          state: "waiting",
          message: "클릭해서 시작하세요!",
          result: [...prevState.result, this.endTime - this.startTime],
        };
      });
    }
  };

  onReset = () => {
    this.setState({
      result: [],
    });
  }

  render() {
    return (
      <>
        <div 
          id="screen"
          className={this.state.state}
          onClick={this.onClickScreen}
        >
          {this.state.message}
        </div>
        {/* jsx에서는 아무 것도 없다는 뜻이 null이다. */}
        {this.state.result.length === 0 
          ? null 
          : <>
            <div>평균 시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length}</div>
            <button onClick={this.onReset}>초기화</button>
          </>
        }
        
      </>
    )
  }
}

export default ResponseCheck;