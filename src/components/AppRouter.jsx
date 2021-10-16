import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { AuthContext } from '../context';
import { publicRoutes, privateRoutes } from '../router/router';
import Loader from './UI/Loader/Loader';

const AppRouter = () => {

    // проверка на авторизацию пользователя использую гобальный контекст
    // инициализируем и импортируем useContext и передаем как аргумент наш контекст AuthContext
    // данные для контекста указаны a в App.js
    const {isAuth, setIsAuth, isLoading} = useContext(AuthContext);
    console.log(isAuth);  //получаем значение App.js - state isAuth'


    // на момент авторизации роутер не сработает и начинает работать только после того
    //  как становится известно авторизован или нет пользователь
    if(isLoading) {
        return <Loader/>
    }  
    // иначе запускаем в работу роутер
    return (
        // в зависимости от значений isAuth отрисовываем разные страницы
        isAuth
            ?
                    // если isAuth==true, для авторизированных пользователей
            <Switch>
            {/* connect component 'route' from react-router-dom  */}
            {/* add path to target page - what will be in a URL after domain name */}
            {/* итеррируемся по массиву маршрутов  и для каждого элеиента массива отрисовываем маршрут*/}
                {privateRoutes.map(route => 
                    // component, path и exact достаем из объекта маршрутов и передаем их как props
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path} // уникальный ключ, т.к. path уникальный 
                    />
                )}
                {/* редирект по дефолту - если такой страницы нет или при переходе на общий url домена*/}
                <Redirect to='/posts'/>   
            </Switch>

                    //  isAuth==false, редирект для неавторизированных пользователей
            :   
            <Switch>
                {publicRoutes.map(route => 
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path} // уникальный ключ, т.к. path уникальный
                    />
                )}
                {/* редирект по дефолту - если такой страницы нет или при переходе на общий url домена*/}
                <Redirect to='/login'/>   
            </Switch>

        
    );
};

export default AppRouter;