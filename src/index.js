import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import './index.css';
import Moves from './components/Moves';
      
// ========================================
// Компонент Game
// ========================================

      const Game = () => { //игра

      // Устанавливаем первоночльное состояние state.history - пустой масив с 9 элементами null 
      // state.stepNumber - номер шага
      // state.xIsNext - true или false для определения кто следующий делает ход
         
         const [state, setState] = useState({
            history: [{
               squares: Array(9).fill(null),
            }]
         }); 
         const [step, setStep] = useState({
            stepNumber: 0,
            xIsNext: true
         });
         
         const [clasSquares, setClasSquares] = useState({
            clasS: Array(9).fill('no_win')
         });


         
         // Слушатель событий принимает номер клетки, выполняются действия 
         // и вычичления, при клике по любой из неактивированых клеток 
         const handleClick = (i) => {
   
                           // Копируем! в history массив с объектом созданный из текущего состояние this.state.history 
            // (от начал массива до номера текущего хода)
            const history = state.history.slice(0, step.stepNumber + 1); 
            // Записываем в current объект над которым производится работа извлекая его из массива
            const current = history[step.stepNumber];
            // Копируем! в squares массив отмеченых и пустых клеток
            const squares = current.squares.slice();
         
         // Если текущий массив содержит выигрышную комбинацию выходим из обработки события 
            if (calculateWinner(squares) || squares[i]) {
               return;
            }

            setStep({
               ...step,
               stepNumber:history.length,
               xIsNext: !step.xIsNext // true или false
            });

            // В зависимости от того чей ход передаем для заполнения поля в массиве squares буквами X или O
            squares[i] = step.xIsNext ? 'X' : 'O'; 
            // const xIsNext = this.state.xIsNext ? false : true;

            // debugger;
             // Добавлем в state.history объект с массивом содержащим последнее состояние игрового поля
            // обновляем значение state.stepNumber прописывая номер текущего хода
            // передаем ход следующему игроку записывая в state.xIsNext - true или false
            setState({
               history: history.concat([{
                  squares: squares
               }])
            });
            
               
         }
         
            // слушатель событий по клику позволяющий перемещатся по игровому процессу возвращаясь назад
         const jumpTo = (stepHistory) => {
            // Принимает номер шага в игре на который надо перейти и меняет значения 
            // в state.stepNumber и state.xIsNext 
            debugger;
         
            setStep({
               stepNumber:stepHistory,
               xIsNext: (stepHistory % 2) === 0 // true или false
            });
         }

            const colorChange = (winner) => {
            
                     const a2 = clasSquares.clasS.map( (i, index) => {
                     
                        if( winner[0] === index || winner[1] === index || winner[2] === index ){
                           i = 'active';
                           return i;
                        }
                        return i;
                     } ) ;
                        // console.log(a2);
                        setClasSquares({
                           ...clasSquares,
                           clasS: a2
                        });
                        // console.log('combo ' + winner);
            }

            const colorLose = () => {
               const a2 = clasSquares.clasS.map( (i) => {
                     
                     i = 'no_win';
                     return i;
               } ) ;
                  // console.log(a2);
                  setClasSquares({
                     ...clasSquares,
                     clasS: a2
                  });
            }
         
         let status;
         let winner = calculateWinner(state.history[step.stepNumber].squares);
         
         if ( winner ) {
            status = 'win ' + winner[0];
            // console.log(winner);
         } else if (step.stepNumber === 9) {
            status = 'ничья';
         } else {
            status = `Next player: ${step.xIsNext ? 'X' : 'O'}`;
         }
         useEffect(() => {
            if(winner){
               debugger;
               colorChange(winner[1]);
            } else {
               colorLose();
            }
         }, [winner]);
    // передаем для рендера основную разметку игры, монтируем отображение информации об игре, 
    // список ходов и комопнент Board с пераметрами о текущем состоянии игры что неоходимо 
    // для визуально отображения заполнения клеток Х или О,
    // а так же слушатель событий для обработки следующего клика по одной из неактивных кнопок

            return (
               <div className="game">
                  <div className="game-board">
                     <Board   onClick = { (i) => handleClick(i) }
                              squares = {state.history[step.stepNumber].squares}
                              clasS = {clasSquares.clasS}
                              />
                  </div>
                  <div className="game-info">
                     <div>{ status }</div>
                     <ol><Moves history={state.history} jumpTo={jumpTo} /></ol>
                  </div>
               </div>
               );
            
   }

         // ========================================
// Функция выигрышных комбинаций
// ========================================
   function calculateWinner(squares) {
      // в массиве собраны все выигрышные компбинации  
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
            // сравниваем комбинации из активированных клеток с выигрышными комбинациями
         if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a],[a,b,c]];
         }
      }
      return null;
   }

      // ========================================
// Установка компонента Game на странице
// ========================================
         
   ReactDOM.render(
      <Game />,
      document.getElementById('root')
      );      