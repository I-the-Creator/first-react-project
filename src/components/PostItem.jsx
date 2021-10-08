import React from 'react';
import MyButton from './UI/button/MyButton';


    // получаем props on родителя - PostList
const PostItem = (props) => {
    console.log(props);   //  список постов
    return (
        <div className="post">
            <div className="post__content">
                {/* number и title получаем из PostList */}
                <strong>{props.number}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className="post__btns">
                {/* удаляем элемент массива с заданным id - проверк id происходит в функции 'removePost' в App.js*/}
                <MyButton onClick={() => props.remove(props.post)}>Delete</MyButton>
            </div>
        </div>
    );
};

export default PostItem;
