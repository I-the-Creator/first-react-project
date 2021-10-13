import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import About from './pages/About';
import Posts from './pages/Posts';
import './styles/App.css';

function App() {
   return (
            <BrowserRouter>
                <div className="navbar">
                    <div className="navbar__links">
                        <a href="/about">About</a>
                        <a href="/posts">Posts</a>
                    </div>
                </div>
            {/* connect component 'route' from react-router-dom  */}
            {/* add path to target page - what will be in a URL after domain name */}
                <Route path="/about" >   
                    <About/>
                </Route>
                <Route path="/posts" >   
                    <Posts/>
                </Route>
            </BrowserRouter>

   )
}

export default App;
