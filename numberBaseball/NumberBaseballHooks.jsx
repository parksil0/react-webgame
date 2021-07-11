import React, { useState, useRef } from 'react';
import Try from './TryHooks.jsx'

function getNumbers() { // 숫자 네 개를 겹치지 않고, 랜뎜하게 뽑는 함수
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];

  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }

  return array;
}

const NumberBaseball = () => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (value === answer.join('')) {
      setResult('홈런');
      setTries((prevTries) => {
        return [...prevTries, { try: value, result: '홈런' }]
      })
      inputRef.current.focus();

      alert('게임을 다시 시작합니다!');
      setValue('');
      setAnswer(getNumbers());
      setTries([]);
      inputRef.current.focus();
    } else { // 답 틀렸으면
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if(tries.length >= 9) { // 열번 이상 틀렸을 때
        setResult(`열 번 넘게 돌려서 실패! 답은 ${answer.join(',')}였습니다.`)
        alert('게임을 다시 시작합니다!');

        setValue('');
        setAnswer(getNumbers());
        setTries([]);
        inputRef.current.focus();
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }

        setTries((prevTries) => {
          return [...prevTries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.` }]
        });
        setValue('');
        inputRef.current.focus();
      }
    }
  }

  const onChangeInput = (e) => {
    console.log(answer);
    setValue(e.target.value);
  }

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        {/* input창에서 value와 onchange는 한 쌍, 아니라면 defaultValue */}
        <input ref={inputRef} maxLength={4} value={value} onChange={onChangeInput} />
      </form>
      <div>
        시도: {tries.length}
        <ul>
          {tries.map((v, i) => {
            return (
              <Try key={`${i + 1}차 시도`} tryInfo={v} />    
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default NumberBaseball;
