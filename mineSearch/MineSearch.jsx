import React, { createContext, useReducer, useMemo, useEffect } from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = {
  OPENED: 0, // 0 이상이면 다 opened
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  MINE: -7,
};

export const TableContext = createContext({
  tableData: [],
  halted: true,
  dispatch: () => {},
});

const initialState = {
  tableData: [],
  data: {
    row: 0,
    cell: 0,
    action: 0,
  },
  timer: 0,
  result: '',
  halted: true,
  openedCount: 0,
}

const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  const candidate = Array(row * cell).fill().map((arr, i) => {
    return i;
  });
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  // 지뢰 심기
  for (let i = 0; i < shuffle.length; i++) {
    const ver = Math.floor(shuffle[i] / cell);
    const hor = shuffle[i] % cell;
    data[ver][hor] = CODE.MINE;
  }

  console.log(data);
  return data;
}

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = "CLICK_MINE";
export const FLAG_CELL = "FLAG_CELL";
export const QUESTION_CELL = "QUESTION_CELL";
export const NORMALIZE_CELL = "NORMALIZE_CELL";
export const INCREMENT_TIMER = "INCREMENT_TIMER";

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME: {
      return {
        ...state,
        data: {
          row: action.row, 
          cell: action.cell, 
          mine: action.mine
        },
        openedCount: 0,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false,
        timer: 0,
      }
    }
    case OPEN_CELL: {
      const tableData = [...state.tableData];
      tableData.forEach((row, i) => {
        tableData[i] = [...state.tableData[i]];
      });
      const checked = [];
      let openedCount = 0;
      // 주변에 지뢰가 있는지 확인하는 알고리즘
      const checkAround = (row, cell) => {
        // 닫힌 칸만 열기
        if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) {
          return;
        }
        if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) { // 상하좌우 칸이 없는 경우 안 열기
          return;
        }
        if (checked.includes(row + ',' + cell)) { // 이미 검사한 칸이라면,
          return;
        } else {
          // 한 번 연 칸은 무시하기
          checked.push(row + ',' + cell);
        }
        let around = [];
        if (tableData[row - 1]) {
          around = around.concat(
            tableData[row - 1][cell - 1],
            tableData[row - 1][cell],
            tableData[row - 1][cell + 1]
          );
        }
        around = around.concat(
          tableData[row][cell - 1],
          tableData[row][cell + 1]
        );
        if (tableData[row + 1]) {
          around = around.concat(
            tableData[row + 1][cell - 1],
            tableData[row + 1][cell],
            tableData[row + 1][cell + 1]
          );
        }
        const count = around.filter((v) =>
          [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)
        ).length;
        

        // 주변이 빈칸인지 확인하는 알고리즘
        if (count === 0) {
          if (row > -1) {
            const near = [];
            if (row - 1 > -1) {
              near.push([row - 1, cell - 1]);
              near.push([row - 1, cell]);
              near.push([row - 1, cell + 1]);
            }
            near.push([row, cell - 1]);
            near.push([row, cell + 1]);
            if (row + 1 < tableData.length) {
              near.push([row + 1, cell - 1]);
              near.push([row + 1, cell]);
              near.push([row + 1, cell + 1]);
            }
            near.forEach((n) => {
              if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                checkAround(n[0], n[1]);
              }
            });
          }
        }
        //
        if (tableData[row][cell] === CODE.NORMAL) {
          openedCount += 1;
        }
        tableData[row][cell] = count;
      } 
      checkAround(action.row, action.cell);
      // 승리 조건
      let halted = false;
      let result = '';
      if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
        halted = true;
        result = `${state.timer}초만에 승리!`;
      }

      return {
        ...state,
        tableData,
        openedCount: state.openedCount + openedCount,
        halted,
        result,
      };
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted: true,
      }
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] = CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;  
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      }
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if ((tableData[action.row][action.cell] = CODE.FLAG_MINE)) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if ((tableData[action.row][action.cell] = CODE.QUESTION_MINE)) {
        tableData[action.row][action.cell] = CODE.MINE;
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      };
    }
    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1,
      }
    }
    default:
      return state;
  }
}

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, halted, timer, result } = state;

  const value = useMemo(() => ({tableData, halted, dispatch}), [tableData, halted]);

  useEffect(() => {
    let timer;
    if (!halted) {
      timer = setInterval(() => {
        dispatch({ type: INCREMENT_TIMER });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    }
  }, [halted]);

  return (
    <>
      <TableContext.Provider value={value}>
        <Form />
        <div>{timer}</div>
        <Table />
        <div>{result}</div>
      </TableContext.Provider>
    </>
  );
}

export default MineSearch;