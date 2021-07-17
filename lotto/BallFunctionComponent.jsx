import React, { memo } from 'react';

// useState, useEffect를 사용하면 훅스다. 해당 파일은 함수 컴포넌트이다.
// memo를 넣으면 퓨어 컴포넌트처럼 된다. hoc(high order component)
const Ball = memo(({ number }) => {
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
});

export default Ball;