import React from 'react';

const GuGuDan = () => {
  const [firstNum, setFirstNum] = React.useState(Math.ceil(Math.random() * 9));
  const [secondNum, setSecondNum] = React.useState(Math.ceil(Math.random() * 9));
  const [inputValue, setInputValue] = React.useState('');
  const [result, setResult] = React.useState('');
  const inputRef = React.useRef(null);

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (parseInt(inputValue) === firstNum * secondNum) {
      setResult('정답!');
      setFirstNum(Math.ceil(Math.random() * 9))
      setSecondNum(Math.ceil(Math.random() * 9))
      setInputValue('');

      inputRef.current.focus();
    } else {
      setResult('땡');
      setInputValue('');

      inputRef.current.focus();
    }
  }

  return (
    <>
      <div>{firstNum} 곱하기 {secondNum}</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputRef} onChange={onChangeInput} value={inputValue} />
        <button>입력!</button>    
      </form>
      <div id="result">{result}</div>
    </>
  )
}

export default GuGuDan