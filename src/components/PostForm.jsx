import React, { useState } from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';


// props 'create' получаем из App.js - родительский компонент 
const PostForm = ({create}) => {
    const [post, setPost]= useState({title: '', body: ''})


    // create new Post
// имя аргумента функции (по сути это событие- event) может быть любым
const addNewPost = (ev) => {
    ev.preventDefault()
    // console.log(title)
    // console.log(body)
    //  просмотр свойства current.value созданной ссылки, current = целевой DOM элемент 
    // неуправляемого компонента
    // console.log(bodyInputRef.current.value)   

    // const newPost = {     // объект нового поста
    //     id: Date.now(), // получаем уникальный id поста из текущей даты (в мс)
    //     title,
    //     body
    // }
    // console.log(newPost);   //  debug

    // ДОБАВЛЕНИЕ
    // не изменяем состояние напрямую? а добавляем созданный объект в массив постов
    // в setPosts передаем новый массив куда "разворачиваем" существующий массив и в конец добавлем новый объект
    // setPosts([...posts, newPost])  

    // проще передать напрямую данные об объекте (развернуть) из post и добавить id, не создавая отдельной переменной
    // setPosts([...posts, {...post, id: Date.now()}])
    
    const newPost = {
        ...post, id: Date.now()
    }

    // очищаем поля инпута после ввода, благодаря двухстороннему связыванию
    // обнуляем состояние
    // setTitle('') 
    // setBody('') 

    create(newPost)

     // для обновления передаем в setPost дефолтные значения
    setPost({title: '', body: ''})
}

    return (
            <form>
                {/* <MyInput
                    value={post.title}
                    // отслеживание ввода данных
                    // из event - полe target - достаем поле value и помещаем в state
                    onChange={e => setTitle(e.target.value)}
                    type="text" 
                    placeholder="Post header"
                />

                <MyInput 
                    value={post.body}
                    // отслеживание ввода данных
                    // из event - полe target - достаем поле value и помещаем в state
                    onChange={e => setBody(e.target.value)}
                    type="text" 
                    placeholder="Post description"
                /> */}

                {/* управляемый компонент */}
                <MyInput
                    value={post.title}
                    // отслеживание ввода данных
                    // передаем в setPost объект в который разворачиваем "старый" пост и перезатираем нужное нам поле (title)
                    // изменяем только нужное на поле, а весь остальной объект остается неизменным
                    onChange={e => setPost({...post, title: e.target.value})}
                    type="text" 
                    placeholder="Post header"
                />

                <MyInput
                    value={post.body}
                    // отслеживание ввода данных
                    // из event - полe target - достаем поле value и помещаем в state
                    onChange={e => setPost({...post, body: e.target.value})}
                    type="text" 
                    placeholder="Post description"
                />

                {/* Неуправляемый стандартный компонент */}
                {/* <input 
                    ref={bodyInputRef}
                    type="text"
                /> */}

                    {/* Неуправляемый/неконтролируемый кастомный компонент */}
                {/* <MyInput 
                    // ссылка на bodyInputRef 
                    ref={bodyInputRef}
                    type="text" 
                    placeholder="Post description"
                /> */}
                {/* add my custom button */}
                <MyButton onClick={addNewPost}>Create Post</MyButton> 
            </form>
    );
};

export default PostForm;