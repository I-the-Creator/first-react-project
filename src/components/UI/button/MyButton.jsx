import React from 'react';
import classes from './MyButton.module.css'   // import styles for buttons

        // делаем деструктуризацию props и выделяем children, остальные пропсы оставляем как есть
const MyButton = ({children, ...props}) => {
    return (
            // add style as object property
            // и "разворячиваем" весь объект props в button
            // теперь любые пропсы передаваемые в компонент MyButton извне будут применяться к button
        <button {...props} className={classes.myBtn}>   
            {/* to add title to button, для этого мы "выделили" этот  props */}
            {children}  
        </button>
    );
};

export default MyButton;