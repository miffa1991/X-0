// ========================================
// Компонент Square
// ========================================
// Функция возвращает клетку для рендера при клике по ней 
// передается событие в родительский компонент, при клике по клетке
// благодаря props.value отображается X или O 
// благодаря props.clasS меняем цвет выграшных класов
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