import React, { useContext } from 'react';
import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';
import { AuthContext } from '../context';

const Login = () => {

    // импортируем глобальный контекст через хук useContext и передаем в качестве аргумента AuthContext
    const {isAuth, setIsAuth} = useContext(AuthContext);
    console.log(isAuth);  //получаем значение App.js - state isAuth'

    // функция 'login' принисает в качестве аргумента событие (event, e и т.д.)
    const login = event => {
        event.preventDefault();
        // вызываем setIsAuth и изменяем состояние isAuth на true
        // это состояние в "глобальном контексте" и его изменение будет видно в других компонентах где оно импортированно
        setIsAuth(true)

        // при авторизации сохраняем в localStorage ключ 'auth' со значением 'true'
        localStorage.setItem('auth', 'true')
        
    }

    return (
        <div>
            <h1>Login page</h1>
            {/* на form "вешаем"  listener и вызываем функцию 'login'*/}
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Enter your Login"/>
                <MyInput type="password" placeholder="Enter your Password"/>
                <MyButton>LOGIN</MyButton>
            </form>
        </div>
    );
};

export default Login;