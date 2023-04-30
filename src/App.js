import { useState } from "react";

function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  // gets the current move that user makes
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    // copy history to the current move
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    // set the current move that the players can go back to
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    // set the currentMove to move that is clicked on
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      // description for the first mpve
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <>
    <h1 className="TITLE">TIC-TAC-TOE</h1>
      <div className="game center">
        <div class="game-board">
          <Board
            squares={currentSquares}
            onplay={handlePlay}
            isNext={xIsNext}
          ></Board>
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}

/**
 * @param {*} { squares, onplay, isNext }
 * {squares} an array with moves that as been made in the game
 * {onplay} a function that will called when a move is made
 * {isNext} a boolean value that is used to specify the next player
 */
function Board({ squares, onplay, isNext }) {
  /**
   * @param {*} i
   * specifies the index of the box that is clicked on
   */
  function handleClick(i) {
    // copy the array
    const newArray = squares.slice();
    // if there is a winner or a box as been clicked on it will do nothing
    if (calculateWinner(squares) || squares[i]) return;
    if (isNext) newArray[i] = "X";
    else newArray[i] = "O";
    onplay(newArray);
  }

  // changes background color of the box specified
  function winnerLiner() {
    winner.elem.forEach((it) => {
      const box = document.querySelectorAll(".square");
      box[it].style.background = "black";
    });
  }

  let status;
  const winner = calculateWinner(squares);
  if (winner) {
    // if there is a winner it will display the winner and specify the moves he used to win by changing the box color
    status = `winner: ${winner.value}`;
    winnerLiner();
  } else status = `Next player: ${isNext ? "X" : "O"}`;

  return (
    <>
      <div className="status">{status}</div>
      <div className="board ">
        <Square event={() => handleClick(0)} value={squares[0]}></Square>
        <Square event={() => handleClick(1)} value={squares[1]}></Square>
        <Square event={() => handleClick(2)} value={squares[2]}></Square>
        <Square event={() => handleClick(3)} value={squares[3]}></Square>
        <Square event={() => handleClick(4)} value={squares[4]}></Square>
        <Square event={() => handleClick(5)} value={squares[5]}></Square>
        <Square event={() => handleClick(6)} value={squares[6]}></Square>
        <Square event={() => handleClick(7)} value={squares[7]}></Square>
        <Square event={() => handleClick(8)} value={squares[8]}></Square>
      </div>
    </>
  );
}

/**
 *
 *
 * @param {*} { event, value }
 * {event} a function that specifies theh event that should be called on when the box is clicked on
 * {value} a text that will be displayed inside the box
 * @return {*}
 */
function Square({ event, value }) {
  return (
    <div className="square" onClick={event}>
      {value}
    </div>
  );
}

/**
 * @param {*} square
 * An array which will be used to perform a logical operation
 * @return {*}
 * It returns the winner(text) and the moves[array] he used to win
 */
function calculateWinner(square) {
  // list of all moves a player can make to become the winner
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // if the values are the same and are not equal to null.
    if (
      square[a] &&
      square[b] &&
      square[c] != null &&
      square[a] === square[b] &&
      square[a] === square[c]
    ) {
      return { value: square[a], elem: lines[i] };
    }
  }
  return null;
}
export default App;
