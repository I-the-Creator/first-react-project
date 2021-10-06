import React from 'react';
import ReactDOM from 'react-dom';    // import react-dom to insert component into application
import App from './App'; // 

ReactDOM.render(   //  call render function of react-dom
          // component to be rendered - what is inside app.js --> function App return

          //  insert element w/o JSX
    // React.createElement('button', {     
    //   // disabled: true   
    //   onClick: () => console.log('CLICK') 
    // }, 'Click Me'),   

            // with JSX
    <App/>,
  document.getElementById('root')   // which block will be used to mount component - from index.html
);

