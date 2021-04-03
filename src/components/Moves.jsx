
   const Moves = (props) => {

      return props.history.map((step, move) => {
          // console.log(move);
         debugger;
         const desc = move ?
            'Go to move #' + move :
            'Go to game start';
         return (
            <li key={move} id={`id`+move}>
               <button onClick={() => props.jumpTo(move)}>{desc}</button>
            </li>
         );
      });
   } 

   export default Moves;