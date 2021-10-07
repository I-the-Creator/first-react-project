import React from 'react';
import classes from './MyInput.module.css'

// "оборачиваем" комспонент в функцию forwardRef и появляется дополнительный props (ref) с ссылкой -
//  чтобы работал useRef для кастомного компонента

const MyInput = React.forwardRef((props, ref) => {
    return (
        // все что будет "попадать" в MyInput будет применяться к input
        <input ref={ref} className={classes.myInput} {...props}/>
    );
});

export default MyInput;