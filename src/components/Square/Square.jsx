const Square = (props) => { //клетка
   
   return (
      <button 
         className={'square '+ props.clasS} 
         value={ props.value } 
         onClick={ props.onClick } 
      >
         {props.value}
      </button>
      );
}

export default Square;