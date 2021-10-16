import About from "../pages/About";
import Login from "../pages/Login";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";

// массив маршрутов для авторизованных пользователей
export const privateRoutes = [
    {path: '/about', component: About, exact: true},
    {path: '/posts', component: Posts, exact: true},

    // динамический маршрут к выбранному посту по кнопке 'Open'
    {path: '/posts/:id', component: PostIdPage, exact: true},
]

// массви маршрутов для "гостей" - неавторизованных пользователей
export const publicRoutes =[
    {path:'/login', component: Login, exact: true},
]