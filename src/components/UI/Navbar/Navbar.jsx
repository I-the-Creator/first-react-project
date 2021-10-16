import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context';
import MyButton from '../button/MyButton';

// navbar component

const Navbar = () => {

    // получаем данные их глобального контекста
    const {isAuth, setIsAuth} = useContext(AuthContext);

    // ПРИ ВЫХОДЕ  удаляем ключ auth из local storage и меняем state isAuth на false
    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    return (
        <div className="navbar">
            {/* кнопка выхода со слушателем события, 
            при нажатии меняем state isAuth на false и удаляем данные из local storage*/}
            <MyButton onClick={logout}>
                Log out
            </MyButton>
            
            <div className="navbar__links">
                <Link to="/about">About</Link>
                <Link to="/posts">Posts</Link>
            </div>
        </div>
    );
};

export default Navbar;