import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import * as serviceWorker from './serviceWorker';
function Square(props){
        return (
            <button className="square" onClick={() => props.onClick()}>
                {props.value}
            </button>
        );

}
function calculateWinner(squares) {
    const lines = [
        [0,1,2,3],
        [6,7,8,9],
        [12,13,14,15],
        [18,19,20,21],
        [1,2,3,4],
        [7,8,9,10],
        [13,14,15,16],
        [19,20,21,22],
        [2,3,4,5],
        [8,9,10,11],
        [14,15,16,17],
        [20,21,22,23],
        [0,6,12,18],
        [3,9,15,21],
        [5,11,17,23],
        [0,7,14,21],
        [3,8,13,18],
        [1,8,15,22],
        [4,9,14,19],
        [1,7,13,19],
        [2,8,14,20],
        [3,9,15,21],
        [4,10,16,22],
        [5,10,15,20],
        [2,9,16,23]
    ];
    for(let i = 0; i < lines.length; i++) {
        const [a,b,c,d] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
            return squares[a];
        }
    }
    return null;
}
class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square key={i} value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        var rows = [];
        for(var i=0; i<4; i++) {
            var row = [];
            for (var j = i *6; j< 6*i+6; j++) {
                // console.log(i *6);
                row.push(this.renderSquare(j));
            }
            rows.push(<div className="board-row" key={i}>{row}</div>)
        }
        return (
            <div>
                {rows}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(24).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,
        }
    }
    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X': 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        })
    }
    jumpTo( step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true,
        });
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move)=> {
            const desc = move ? 'Move #' + move : 'Game start';
            return (
                <li key={move}>
                    <a href='#' onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            )
        });


        let status;
        if (winner) {
            status = 'Winner: ' +winner;
        }else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i)=> this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);


