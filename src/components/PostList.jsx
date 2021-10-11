import React from 'react';
import PostItem from './PostItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

    // props это объект и мы можем в явном виде передать в props массив объектов 'posts' и 'title'
    // это деструктуризация
const PostList = ({posts, title, remove}) => {
    // console.log(posts);   // массив постов полученный в App.js из PostService.js


//  Условная отрисовка 
//  проверяем что длина массива отфильтрованных и отсорт. постов = 0 
    if (!posts.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Posts not found!
            </h1>
        )
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>    
                {title}
            </h1>
            {/* connect Transition Group library */}
            <TransitionGroup>
                {/* each 'post' from array convert to React element (JSX) using .map */}
                {/* проиттерируемся по массиву */}
                {/* callback где каждый объект post преобразовываем в JSX */}
                {posts.map((post, index)=> 
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="post"   // имя класса для CSSTransition в App.css
                    >
                        {/* <div>POST</div>   // debug */}
                        {/* create PostItem and put the object as a props */}
                        {/* index - порядковый номер поста */}
                        {/* имя пропса 'post' может быть любым (такое же как в posts.map('имя')) */}
                        {/* обязательно задаем уникальный key для каждого элемента, задаем на корневом элемнте списка */}
                        <PostItem remove={remove} number={index + 1} post={post}/>
                        {/* {index + 1} - чтобы отчет шел не с нуля */}
                    </CSSTransition>
                )}  
            </TransitionGroup>



        </div>
    );
};

export default PostList;