import React, { Component, createRef } from 'react';
import Try from './Try.jsx'

function getNumbers() { // 숫자 네 개를 겹치지 않고, 랜뎜하게 뽑는 함수
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];

  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }

  return array;
}

class NumberBaseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: [],
  }

  numberArr = [
    {name: '1', value: 'one'},
    {name: '2', value: 'two'},
    {name: '3', value: 'three'},
    {name: '4', value: 'four'},
    {name: '5', value: 'five'}
  ];

  // 화살표 함수를 사용하지 않으면 클래스 내의 constructor() {} 를 사용해야 한다.
  onSubmitForm = (e) => {
    e.preventDefault();

    if (this.state.value === this.state.answer.join('')) {
      this.setState((prevState) => {
        return {
          result: '홈런',
          tries: [...prevState.tries, {try: prevState.value, result: '홈런'}]
        }
      });
      alert('게임을 다시 시작합니다!');
      this.setState({
        value: '',
        answer: getNumbers(),
        tries: [],
      });
      this.inputRef.current.focus();
    } else { // 답 틀렸으면
      const answerArray = this.state.value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if(this.state.tries.length >= 9) { // 열번 이상 틀렸을 때
        this.setState({
          result: `열 번 넘게 돌려서 실패! 답은 ${this.state.answer.join(',')}였습니다.`,
        })
        alert('게임을 다시 시작합니다!');
        this.setState({
          value: '',
          answer: getNumbers(),
          tries: [],
        });
        this.inputRef.current.focus();
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === this.state.answer[i]) {
            strike += 1;
          } else if (this.state.answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState((prevState) => {
          return {
            tries: [...prevState.tries, { try: prevState.value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}],
            value: '',
          }
        });
        this.inputRef.current.focus();
      }
    }
  }

  onChangeInput = (e) => {
    console.log(this.state.answer);
    this.setState({
      value: e.target.value,
    })
  }

  inputRef = createRef();

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          {/* input창에서 value와 onchange는 한 쌍, 아니라면 defaultValue */}
          <input ref={this.inputRef} maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
        </form>
        <div>
          시도: {this.state.tries.length}
          <ul>
            {this.state.tries.map((v, i) => {
              return (
                <Try key={`${i + 1}차 시도`} tryInfo={v} />    
              )
            })}
          </ul>
        </div>
      </>
    );
  }
}

export default NumberBaseball;
/*

  변수명만 안겹치면 여러 번 선언 가능
  export const hello = "hello" // import { hello }
  export const bye = "bye" // import { bye }

  힌 번만 선언 가능
  export default NumberBaseball // import NumberBaseball

  ---

  const React = require('react');
  exports.hello = 'hello';
  module.exports = NumberBaseball;
*/