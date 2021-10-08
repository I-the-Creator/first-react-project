import React from 'react';
import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect';

// в props принимает filter - некий объект и функция изменения фильтра
const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            {/* ПОИСК  - вводим название поста и все остальные посты из списка изчезают*/}
            {/* Управляемый input и двустороннее связывание */}
            <MyInput
                value={filter.query}
                // слушатель события onChange и помещаем значение из target.value в наше состояние
                onChange={e => {
                    console.log(e.target.value);  //  вводимый текст для поиска
                    setFilter({...filter, query: e.target.value})}
                }
                placeholder='Search...'
            />
        
            {/* Сортировка постов - UI компонент*/}
            {/* props - дефолтное значение и массив опций списка + state 'selectedSort' */}   
                <MySelect
                    value={filter.sort}
                    // в сеттер передаем то что приходит из <select> - выбор пользователя и вызываем функцию sortPosts
                    // возвращает не event, а выбранный алгоритм сортировки - назовем его selectedSort
                    onChange={selectedSort => { 
                        console.log(selectedSort);
                        setFilter({...filter, sort: selectedSort})}
                    }
                    defaultValue="Sort by"
                    options={[
                        {value: 'title', name: 'Name'},
                        {value: 'body', name: 'Description'}
                    ]}
                />
        </div>

    );
};

export default PostFilter;