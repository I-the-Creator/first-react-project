import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useState } from 'react/cjs/react.development';
import PostService from '../API/PostService';
import { useFetching } from '../hooks/useFetching';
import Loader from '../components/UI/Loader/Loader';

// из URL поста выцепляем id поста и отправляем на сервер запрос для получения поста по id

const PostIdPage = () => {
    const params = useParams()
    console.log(params)  //  объект с параметрами переданными в URL - id поста 

    // создаем состояние 'post' и помещаем туда ответ сервера - объект
    const [post, setPost] = useState({})  // пустой оюъект by default - первая отрисовка
    
    // используем кастомный хук useFetching для отправки запросов
    // возвращает массив элементов - 1)некоторая функция, 2)индикатор загрузки, 3)ошибка
    // в качестве параметра принимает асинхронный callback который будет возвращен в виде обертки первым элементом этого массива
    // передаем в функцию некий id в качестве парметра
    const[fetchPostsById, isLoading, error] = useFetching( async (id) => {
        // 'дергаем' PostService и метод getById
        // await перед вызовом метода
        const response = await PostService.getById(id)
        console.log(response);
        setPost(response.data);

    })


    // при первой отрисовке компонента получаем данные с сервера
    useEffect ( () => {
        // вызов функции fetchPostsById и передаем в качестве параметра params.id
        fetchPostsById(params.id)
    }, [])


    return (
        <div>
            <h1>You've opened post page with ID = {params.id}</h1>
            {/* индикация загрузки по условию, если IsLoading == true, то Loader*/}
            {isLoading
                ? <Loader/>
                    // вывод поста
                : <div>{post.id}. {post.title}</div>
            }
        </div>
    );
};

export default PostIdPage;