import React from 'react';
import PostItem from './PostItem';

    // props это объект и мы можем в явном виде передать в props массив объектов 'posts' и 'title'
    // это деструктуризация
const PostList = ({posts, title, remove}) => {
    console.log(posts);   // массив постов


{/* Условная отрисовка */}
{/* проверяем что длина массива отфильтрованных и отсорт. постов = 0 */}
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
            {/* each 'post' from array convert to React element (JSX) using .map */}
            {/* проиттерируемся по массиву */}
            {/* callback где каждый объект post преобразовываем в JSX */}
            {posts.map((post, index)=>     
                // <div>POST</div>   // debug
                // create PostItem and put the object as a props
                // index - порядковый номер поста
                // имя пропса 'post' может быть любым (такое же как в posts.map('имя'))
                // обязательно задаем уникальный key для каждого элемента
                <PostItem remove={remove} number={index + 1} post={post} key={post.id}/>
                // {index + 1} - чтобы отчет шел не с нуля
            )}  
        </div>
    );
};

export default PostList;