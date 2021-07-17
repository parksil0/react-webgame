import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Ball from "./BallFunctionComponent";

function getWinNumbers() {
  console.log("start!");
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

// hooks는 순서가 굉장히 중요하다. 또한 조건문이나 반복문안에 넣으면 안 된다.
const Lotto = () => {
  // useMemo는 복잡한 함수 결과'값'을 기억한다.
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winBalls, setWinBalls] = useState([]);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);

  //useRef는 일반 값을 기억한다.
  const timeouts = useRef([]);

  // inputs 자리가 비어있으면(빈 배열) componentDidMount이다.
  // inputs 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행
  useEffect(() => {
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevWinBalls) => {
          return [...prevWinBalls, winNumbers[i]];
        });
      }, (i + 1) * 1000);
    }

    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);

    // componentWillUnmount
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]);

  // useCallback은 함수 자체를 기억한다. 함수 자체가 실행이 오래걸린다면 useCallback을 사용한다.
  // 두 번째 인자에 들어가는 값이 변경되면 다시 useCallback으로 기억한다.
  const onClickRedo = useCallback(() => {
    console.log("usecallback");
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]);

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
}

export default Lotto;
