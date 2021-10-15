import React from 'react';
import { useHistory } from 'react-router';
import MyButton from './UI/button/MyButton';


    // получаем props oт родителя - PostList
const PostItem = (props) => {

    // console.log(props);  // список объектов Posts

    const router = useHistory()
    // console.log(router)   // список объектов маршрутизации для каждого объекта post со свойствами push, go, location... 

    // console.log(props);   // debug -  получаем список объектов (постов)
    return (
        <div className="post">
            <div className="post__content">
                {/* number и title получаем из PostList */}
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className="post__btns">
                {/* router.push - переход на конкреиную страницу без использования ссылок */}
                {/* например пр нажатии на кнопку или при любом другом событии */}
                {/* формируется динамический путь к конкретному посту */}
                <MyButton onClick={() => router.push(`/posts/${props.post.id}`)}>
                    Open
                </MyButton>
                {/* удаляем элемент массива с заданным id - проверк id происходит в функции 'removePost' в App.js*/}
                <MyButton onClick={() => props.remove(props.post)}>Delete</MyButton>
            </div>
        </div>
    );
};

export default PostItem;
