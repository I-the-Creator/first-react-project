import React, { useState } from 'react'
import ClassCounter from './components/ClassCounter';
import PostItem from './components/PostItem';
import Counter from './components/Сounter';
import './styles/App.css';

function App() {
    // const state = useState(0)     //  create state with O by default - to inform React that component variable is changed
    // console.log(state);     //   array with declared element '0' and function to change state
    // const [likes, setLikes] = useState(5)     //  destructure 'state' as we know it's consist of two elements
    //             //  setLikes - function to change the state
    // console.log(likes);    
    // console.log(setLikes);

    // const [value, setValue] = useState('INPUT TEXT')
    // let likes = 0;
  

// function increment() {
//   likes += 1;
//   console.log(likes);
// }



    return (
    <div className="App">
        {/* <h1>{likes}</h1>
        <h1>{value}</h1>
    <input 
        type="text" 
        value={value}
                    //  используем двухстороннее связывание - состояние связали со значением в input
                    // put into setValue argument 'event.target.value'
        onChange={event => setValue(event.target.value)}   //  add listener for 'input' using callback, target=input, value=text inside input
        // when we change text in input, the const 'value' also changes
    /> */}
        {/* <PostItem value={"2222"} item={{title:0}} number={1}/>  // added props */}
                    {/* add props and use them in PostItem component*/}
        <PostItem post={{id: 1, title: 'JavaScript', body: 'Description'}}/>  
        <Counter/>
        <ClassCounter/>
    </div>
    );
}

export default App;
