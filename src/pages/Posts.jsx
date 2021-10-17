import React, { useEffect, useState } from 'react';
import { useRef } from 'react/cjs/react.development';
import PostService from '../API/PostService'; // import class PostService
import PostFilter from '../components/PostFilter';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import Loader from '../components/UI/Loader/Loader';
import MyModal from '../components/UI/MyModal/MyModal';
import Pagination from '../components/UI/pagination/Pagination';
import MySelect from '../components/UI/select/MySelect';
import { useFetching } from '../hooks/useFetching';
import { useObserver } from '../hooks/useObserver';
import { usePosts } from '../hooks/usePosts';
import { getPageCount } from '../utils/pages';

function Posts() {
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
// console.log(limit)

// state для хранения номера текущей (отображаемой) страницы, по умолчанию 1 - передаем в функцию 'getAll' PostServic.js
const [page, setPage] = useState(1)


// сортировка и поисковая фильтрация
const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);




// инициализация последнего элемента на странице
// когда этот элемент появится в зоне видимости окна браузера, будет подгружаться новая порция данных
const lastElement = useRef() //  хук useRef для получения элемнента и референс передаем в последний элеме
console.log(lastElement)  // в поле current референса находится целевой блок div
console.log(lastElement.current)  // в поле current референса находится целевой блок div

// состояние isPostLoading для 'заполнения' на время загрузки постов, по умолчанию false
// const [isPostLoading, setIsPostLoading] = useState(false)

// передаем в хук useFetching асинхронный callback и деструктуризируем параметры useFetching
const [fetchPosts, isPostLoading, postError ] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);   // вызываем PostService который возвращает весь response сервера 
    // console.log(page);
    // создаем новый массив, помещакем туда те посты которые естьи в конец добавляем новую порцию
    setPosts([...posts, ...response.data]);  //  сетим (изменяем) состояние setPosts и передаем в качестве аргумента response.data - массив постов

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

// подключаем кастомный хук useObserver, передаем параметры
// последний элемент, нужное нам условие, isPostLoading (загрузились ли посты) и последним передаем callback
// в котором изменяем номер страницы на 1
useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1)
})

// deps пустой чтобы функция отработала в начале - подгрузка постов при загрузке приложения
useEffect(() => {
    console.log('USEEFFECT DEMONSTRATION') //  debug
    // отработает один раз при монтаже - посты сразу подгружаются, а затем при каждом изменении состояния 'page'
    fetchPosts(limit, page)   // fetching каждый раз с текущим значением limit и page через хук useFetching 
    // в deps добавляем state 'page'(c номером страницы), и на каждое изменение номера будут подгружаться новые посты
}, [page, limit])   //  deps array, срабатывает при изменении номера страницы и лимита постов на странице


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

            {/* управление лимитом постов на страницу, выпадающий список */}
            <MySelect
                value={limit}
                onChange={limitValue => {setLimit(limitValue);
                    console.log(limitValue);}
                }
                
                defaultValue="Posts number on page"
                // массив опций
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    // limit == -1 - отображает все посты
                    {value: -1, name: 'All Posts'},
                ]}
            />

            {/* Индикатор ошибки */}
            {postError &&    //  если postError не пустой (true), то выводит ошибку - второй операнд &&
                <h1>An Error Occurred: '{postError}'</h1>
            }

            {/* список постов отрисовывается в любом случае */}
            <PostList remove={removePost} posts={sortedAndSearchPosts} title="Articles"/> 


            {/* когда этот блок попадает в зону видимости, подгружается новая порция данных*/}
            {/* референс - lastElement, по нему получаем доступ к DOM элементу  */}
            <div ref={lastElement} style={{height:20, background:'red'}}/>

            {/* условие для isPostLoading, Loader показывается только если isLoading == true */}
            {isPostLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>  // если true, показываем крутилку
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

export default Posts;
