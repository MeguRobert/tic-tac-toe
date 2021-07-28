import React, {useState} from 'react'
import Board from './Board'
import '../index.css';
import Button from '@material-ui/core/Button';

export default function Game() {

    const [state, setState] = useState(
        {
            history: [{squares: Array(9).fill(null)}],
            stepNumber: 0,
            xIsNext: true
        }
    )
    const turn = state.xIsNext ? 'X' : 'O';
    const current = state.history[state.history.length - 1];
    const winner = calculateWinner(current.squares);
    const status = winner ? 'The winner is: ' + winner : 'Next player: ' + turn;

    const moves = state.history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
        
        const styles = {
            color: "#47d7df",
            fontSize: '1.5rem',
            backgroundColor: "#4793df"
        }
      return (
        <li key={move}>
          <Button variant="contained" style={styles} onClick={() => jumpTo(move)}>{desc}</Button>
        </li>
      );
    });
    
    
    const handleClick = (i) => {
        const history = state.history.slice(0, state.stepNumber + 1);
        const current = history[history.length - 1];
        const squareList = current.squares.slice();
        if (winner || current.squares[i]) {
            return;
        }
        squareList[i] = turn
        setState({
            history: history.concat([{squares: squareList}]),
            stepNumber: history.length,
            xIsNext: !state.xIsNext
        })
    }
    
    const jumpTo = (step) => {
        setState({
            history: state.history.slice(0, step + 1),
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }


    return (
      <div className="game">
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={handleClick}
          />
        </div>
      </div>
    );
}


const calculateWinner = (squares) => {
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
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
            }
        }
    return null;
}