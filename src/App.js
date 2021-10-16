import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/UI/Navbar/Navbar';
import { AuthContext } from './context';
import About from './pages/About';
import Error from './pages/Error';
import Posts from './pages/Posts';
import './styles/App.css';

function App() {

    // state для ослеживания статуса авторизации пользователя
    const [isAuth, setIsAuth] = useState(false);

    // состояние с индикацией закончился ли запрос на сервер - 
    const [isLoading, setLoading] = useState(true) // по умолчанию true, и редиректы AppRouter не запускаются


     //  проверка на авторизованность при первом запуске приложения, 
     // данные берем из local Storage, по ключу auth получаем сохраненное значение
    useEffect(() => {
        if(localStorage.getItem('auth')) {
            setIsAuth(true)  // если auth есть в local storage, то isAuth делаем = true
            // иначе, оно и так false по умолчанию
        }
         // не важно залогинились или нет, меняем state на false и тогда запустится редирект AppRouter
        setLoading(false);
    }, [])

    return (
       // внутрь контекта помещаем наше приложение и указываем какие данные будут в глобальном контексте
       // это данные из state isAuth и isLoading, будут переданы в AppRouter
       <AuthContext.Provider value={{
           isAuth, // пусто по умолчанию, при проверке дает false
            //    setIsAuth: setIsAuth()  более длинная запись
           setIsAuth,
           isLoading   
       }}>
           <BrowserRouter>
                <Navbar/>
                <AppRouter/>
            </BrowserRouter>
       </AuthContext.Provider> 
   )
}

export default App;
