import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle_icon from '../assets/circle.png';
import cross_icon from '../assets/cross.png';

const WIN_COMBINATIONS = [
  [0, 1, 2], // Rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // Columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // Diagonals
  [2, 4, 6],
];

const TicTacToe = () => {

  const [board, setBoard] = useState(Array(9).fill(''));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) =>{
    debugger;
    if (board[index] != '' || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'x' : 'o';
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
    checkWin(newBoard);
  };

  const checkWin = (board) => {
    for (let combo of WIN_COMBINATIONS) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    //Optional
    if(!board.includes('')){
      setWinner('draw');
    }
  };

  const reset = () => {
    //debugger;
    setBoard(Array(9).fill(''));
    setIsXTurn(true);
    setWinner(null);
  };

  const renderCell = (value, index) =>(
    <div className='boxes' key={index} onClick={() => handleClick(index)}>
      {value === 'x' && <img src={cross_icon} alt='X'/>}
      {value === 'o' && <img src={circle_icon} alt='O'/>}
    </div>
  );

  return (
    <div className="container">
      <h1 className="title">
        Tic Tac Toe Game In <span>React</span>
      </h1>
      <div className="board">
        {board.map((value, index) => renderCell(value, index))}
      </div>
      {winner && (
        <h2 className="result">
          {winner === 'draw' ? "It's a draw!" : `${winner.toUpperCase()} wins!`}
        </h2>
      )}
      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
