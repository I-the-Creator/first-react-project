import React from 'react';
import { Redirect, Switch, Route } from 'react-router';
import About from '../pages/About';
import Error from '../pages/Error';
import PostIdPage from '../pages/PostIdPage';
import Posts from '../pages/Posts';

const AppRouter = () => {
    return (
        <Switch>
        {/* connect component 'route' from react-router-dom  */}
        {/* add path to target page - what will be in a URL after domain name */}
            <Route path="/about">   
                <About/>
            </Route>
            <Route exact path="/posts">   
                <Posts/>
            </Route>

            {/* динамический маршрут к выбранному посту по кнопке 'Open' */}
            <Route exact path="/posts/:id">   
                <PostIdPage/>
            </Route>

            <Route path="/error">
                <Error/>
            </Route>
            <Redirect to='/error'/>
        </Switch>
    );
};

export default AppRouter;