import React, { useMemo, useRef, useState, useEffect } from 'react'
// import ClassCounter from './components/ClassCounter';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
// import PostItem from './components/PostItem';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
// import MyInput from './components/UI/input/MyInput';
import MyModal from './components/UI/MyModal/MyModal';
// import MySelect from './components/UI/select/MySelect';
// import axios from 'axios';
// import {getPageCount} from './utils/pages';
// import Counter from './components/Сounter';
import { usePosts } from './hooks/usePosts';
import './styles/App.css';
// import { Axios } from 'axios';
import PostService from './API/PostService';  // import class PostService
import Loader from './components/UI/Loader/Loader';
import { useFetching } from './hooks/useFetching';
import { getPageCount} from './utils/pages';  // import function 
import Pagination from './components/UI/pagination/Pagination';

function App() {
    // const state = useState(0)     //  create state with O by default - to inform React that component variable is changed
    // console.log(state);     //   array with declared element '0' and function to change state
    // const [likes, setLikes] = useState(5)     //  destructure 'state' as we know it's consist of two elements
    //             //  setLikes - function to change the state
    // console.log(likes);    
    // console.log(setLikes);

    // const [value, setValue] = useState('INPUT TEXT')
    // let likes = 0;
  

// function increment() {
//   likes += 1;
//   console.log(likes);
// }


        // create state consisting of Objects array (массив объектов) 
const [posts, setPosts] = useState([
    // {id: 1, title: 'Javaaaa', body: 'fff'},
    // {id: 2, title: 'Javaccc', body: 'Des'},
    // {id: 3, title: 'Javabbb', body: 'bbbb'}
])

// const [posts2, setPosts2] = useState([
//     {id: 1, title: 'Python', body: 'Description'},
//     {id: 2, title: 'Python 2', body: 'Description'},
//     {id: 3, title: 'Python 3', body: 'Description'}
// ])

// создаем "управляемый input" чтобы получать название поста и его описание из input
// state по умолчанию - пустая строка. в <MyInput> создаем двухстороннее связывание
// const [title, setTitle]= useState('')
// const [body, setBody]= useState('')

// создаем общий "управляемый" input для всеx полей т.к. их может быть много


// получение данных из "неуправляемого input"
// const bodyInputRef = useRef()    // создаем ссылку с помощью хука useRef()

// создаем state для сортировки - пустая строка по умолчанию, setter - setSelectedSort
// const [selectedSort, setSelectedSort] = useState('')

// создаем state для поиска (управляемы input) и проинициализируем useState,  функция 'setSearchQuery' управляет состоянием
// const [searchQuery, setSearchQuery] = useState('')

// состояние 'filter' содержащее алготритм сортировки и поисковую строку - для компонента PostFilter
const [filter, setFilter] = useState({sort: '', query: ''})

// состояние отвечающее за видимость модального окна и динимаческое управление видимостью
const [modal, setModal] = useState(false)   // false by default,  передаем в MyModal как props


// состояние в которое будем помещать общее количество страниц
const [totalPages, setTotalPages] = useState(0)  // 0 by default

// state для лимита постов на страницу, 10 по умолчанию - передаем в функцию 'getAll' PostServic.js
const [limit, setLimit] = useState(10)

// state для хранения номера текущей (отображаемой) страницы, по умолчанию 1 - передаем в функцию 'getAll' PostServic.js
const [page, setPage] = useState(1)


// сортировка и поисковая фильтрация
const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query)


// состояние isPostLoading для 'заполнения' на время загрузки постов, по умолчанию false
// const [isPostLoading, setIsPostLoading] = useState(false)

// передаем в хук useFetching асинхронный callback и деструктуризируем параметры useFetching
const [fetchPosts, isPostLoading, postError ] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);   // вызываем PostService который возвращает весь response сервера 
    // console.log(page);
    setPosts(response.data);  //  сетим (изменяем) состояние setPosts и передаем в качестве аргумента response.data - массив постов

    // получаем общее количество постов
    const totalCount = response.headers['x-total-count'];
    // console.log(totalCount);
    // console.log(limit);
    // console.log(getPageCount(totalCount, limit));
    // передаем в pages.js - общее кол-во постов и лимит на страницу
    setTotalPages(getPageCount(totalCount, limit));
})
// console.log(totalPages); // debug



// function getSortedPosts() {
// }
// const sortedPosts = getSortedPosts()

 //  функция на вход ожидает новый пост - newPost из компонента PostForm
const createPost = (newPost) => {
    // изменяем состояние - разворачивани старый массив и добавляем новый пост
    setPosts([...posts, newPost])
    setModal(false) // передаем в state 'modal' аргумент false для сокрытия мод. окна после создания поста
}


// deps пустой чтобы функция отработала в начале - подгрузка постов при загрузке приложения
useEffect(() => {
    console.log('USE EFFECT DEMONSTRATION') //  debug
    // отработает один раз при монтаже - посты сразу подгружаются, а затем при каждом изменении состояния 'page'
    fetchPosts(limit, page)   // fetching каждый раз с текущим значением limit и page через хук useFetching 
}, [])   //  deps array


// функция запроса массива постов из API - возвращает массив постов
// async function fetchPosts() {
//     setIsPostLoading(true);  // перед отправкой запроса, изменяем состояние isPostLoading на true
//     setTimeout(async () => {   // fake timeout на 3 сек для загрузки крутилки

//         setIsPostLoading(false);  // после окончания запроса и получения постов изменяем состояние isPostLoading обратоно 
//     }, 1000)
// }


// удаление поста - получение post из дочернего компонента
const removePost = (post) => {
    // из массива постов удаляем тот пост который передали аргументом
    // функция filter - фильтрует массив по заданному условию
    // проверяем id. если переданный id совпадает с id какого-либо элемента массива, то его удаляем
    setPosts(posts.filter(p => p.id !== post.id))

}


// функция изменения номера страницы и подгрузки новыз постов 
// вызывается в Pagination.jsx
const changePage = (page) => {
    setPage(page)   // меняем state 'page' на нажатый номер страницы
    fetchPosts(limit, page)
}


// // функция сортировки
// const sortPosts = (sort) => {   // 
//     console.log(sort)   // в sort помещаем  значение selectedSort после выбора (title или body)
//     setSelectedSort(sort);    // перезаписываем состояние (state) selectedSort в зависимости от выбора,
//     // setPosts(sortedPosts) // и перезаписываем состояние (state) posts - список постов
// }

    return (
        <div className="App">
            {/* кнопка для выполнения GET запроса */}
            {/* <button onClick={fetchPosts}>GET POSTS</button> */}

            {/* при нажатии на кнопку всплывает модальное окно, т.к. вызываем setModal с аргументом true */}
            <MyButton  style={{marginTop: 30}} onClick={() => setModal(true)}>
                Add new Post
            </MyButton>
            {/* state 'modal' передаем как пропс в компонент модельного окна, setVisible - функция изменения состояния  */}
            <MyModal visible={modal} setVisible={setModal}>
                {/* add callback 'createPost' для получения данных от дочернего компонента */}
                <PostForm create={createPost}/>
            </MyModal>
            {/* <h1>{likes}</h1>
            <h1>{value}</h1>
        <input 
            type="text" 
            value={value}
                        //  используем двухстороннее связывание - состояние связали со значением в input
                        // put into setValue argument 'event.target.value'
            onChange={event => setValue(event.target.value)}   //  add listener for 'input' using callback, target=input, value=text inside input
            // when we change text in input, the const 'value' also changes
        /> */}
            {/* <PostItem value={"2222"} item={{title:0}} number={1}/>  // added props */}
                        {/* add props and use them in PostItem component*/}
            {/* <PostItem post={{id: 1, title: 'JavaScript', body: 'Description'}}/> */}
            {/* <Counter/> */}
            {/* <ClassCounter/> */}

            {/* разделитель */}
            <hr style={{margin: '15px 0'}}/>

            <PostFilter
                filter={filter}
                setFilter={setFilter}    
            />

            {/* Индикатор ошибки */}
            {postError &&    //  если postError не пустой (true), то выводит ошибку - второй операнд &&
                <h1>An Error Occurred: '{postError}'</h1>
            }

            {/* условие для isPostLoading */}
            {isPostLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>  // если true, показываем крутилку
                // если false, то передаем в props 'posts' отфильтрованный(после поиска) и отсорт. массив
                // показываем список постов
                :  <PostList remove={removePost} posts={sortedAndSearchPosts} title="Articles"/>
                
            }
                

            {/* <PostList posts={posts2} title="Посты про Python"/> */}
            
            <Pagination
                totalPages={totalPages}
                page={page}
                changePage={changePage} 
            />
         
        </div>
    );
}

export default App;
