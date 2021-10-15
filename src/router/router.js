import About from "../pages/About";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";


export const routes = [
    {path: '/about', component: About, exact: true},
    {path: '/posts', component: Posts, exact: true},

    // динамический маршрут к выбранному посту по кнопке 'Open'
    {path: '/posts/:id', component: PostIdPage, exact: true}
]