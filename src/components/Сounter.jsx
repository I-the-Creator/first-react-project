import React, { useState } from 'react';

const Сounter = function () {
    const [count, setCount] = useState(0)

    function increment() {
        setCount(count + 1)   //  call the setCount function with argument = 'count+1', and it changes the 'count' value
    }
    
    function decrement() {
        setCount(count - 1)  //  call the setCount function with argument = 'count-1', and it changes the 'count' value
      
    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>Increment</button> 
            {/* <button onClick={() => likes -= 1}>Decrement</button>   //  use arrow function */}
            <button onClick={decrement}>Increment</button> 
        </div>
    )
}

export default Сounter;   // export component