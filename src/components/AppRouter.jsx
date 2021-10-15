import React from 'react';
import { Redirect, Switch, Route, Router } from 'react-router';
import About from '../pages/About';
import Error from '../pages/Error';
import PostIdPage from '../pages/PostIdPage';
import Posts from '../pages/Posts';
import { routes } from '../router/router';

const AppRouter = () => {
    return (
        <Switch>
        {/* connect component 'route' from react-router-dom  */}
        {/* add path to target page - what will be in a URL after domain name */}
        {/* итеррируемся по массиву маршрутов  и для каждого элеиента массива отрисовываем маршрут*/}
            {routes.map(route => 
                // component, path и exact достаем из объекта маршрутов и передаем их как props
                <Route
                    component={route.component}
                    path={route.path}
                    exact={route.exact}
                />
            )}
            {/* редирект по дефолту - если такой страницы нет или при переходе на общий url домена*/}
            <Redirect to='/posts'/>   
        </Switch>
    );
};

export default AppRouter;