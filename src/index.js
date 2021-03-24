import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import './index.css';
      
      class Game extends React.Component { //игра

         constructor(props) {
            super(props);
            this.state = {
               history: [{
                  squares: Array(9).fill(null),
                  clasS: Array(9).fill('no_win')
               }],
               stepNumber: 0,
               xIsNext: true
            };
         }
         
         handleClick(i) {
            
            const history = this.state.history.slice(0, this.state.stepNumber + 1);
            // console.log(history);
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            const clasS = current.clasS.slice();
         
            if (calculateWinner(squares) || squares[i]) {
               return;
            }
            squares[i] = this.state.xIsNext ? 'X' : 'O'; 
            // const xIsNext = this.state.xIsNext ? false : true;

            this.setState({
               history: history.concat([{
                  squares: squares,
                  clasS: clasS
               }]),
               stepNumber: history.length,
               xIsNext: !this.state.xIsNext
            });

            const squaresWin = calculateWinner(squares) && calculateWinner(squares) ;
            if (squaresWin) {
            const a2 = clasS.map( (i, index) => {
         
            if( squaresWin[1][0] === index || squaresWin[1][1] === index || squaresWin[1][2] === index ){   
               i = 'active';
               return i;
            }
            return i;
            } ) ;
            
            this.setState({
               history: history.concat([{
                  squares: squares,
                  clasS:a2,
               }])
            });
            //здесь должны поменять цвет
         }
            
         }

         jumpTo(step) {
            this.setState({
               stepNumber:step,
               xIsNext: (step % 2) === 0
            })
         }
         
         render() {
            
            const history = this.state.history;
            const current = history[this.state.stepNumber];
            const winner = calculateWinner(current.squares);
            let status;

            const moves = history.map((step, move) => {
               const desc = move ?
                  'Go to move #' + move :
                  'Go to game start';
               return (
                  <li key={move}>
                     <button onClick={() => this.jumpTo(move)}>{desc}</button>
                  </li>
               );
            });
            
         
            if ( winner ) {
               status = 'win ' + winner[0];
               // console.log(winner);
            } else if (history.length === 10) {
               status = 'ничья'
            } else {
               status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
            }
            // debugger
            return (
               <div className="game">
                  <div className="game-board">
                     <Board   onClick = { (i) => this.handleClick(i) }
                              squares = {current.squares}
                              clasS = {current.clasS}
                              />
                  </div>
                  <div className="game-info">
                     <div>{ status }</div>
                     <ol>{ moves }</ol>
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
      

   function calculateWinner(squares) {
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
            return [squares[a],[a,b,c]];
         }
      }
      return null;
   }
