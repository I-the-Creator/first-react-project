import React from "react";

class ClassCounter extends React.Component {  // create class and inherit it from React.Component

    constructor (props) {      // create constructor and it takes 'props' as a parameters
        super(props);
        this.state = {  // initialize state within component using property '.state'
            count: 0
        }

        // bind component context (this) to functions 'increment' and 'decrement'
        // if don't do this context will be lost during functions call, and 'setState' will be working with 'undefined'
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    increment() {     // as we work within class we can delete word 'function' when declaring it
        this.setState({count: this.state.count + 1})  // call setState function with new state of 'count' - increment by 1 
        
    }
    
    decrement() {
        this.setState({count: this.state.count - 1})  // call setState function with new state of 'count' - decrement by 1 
    }

    render() {      //  add render to class component - 
        return (
            <div>
                <h1>{this.state.count}</h1>  
                <button onClick={this.increment}>Increment</button> 
                <button onClick={this.decrement}>Decrement</button> 
            </div>
        )
    }
}

export default ClassCounter;