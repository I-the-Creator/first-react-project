import { useMemo } from "react";

// кастомный хук, принимает в качестве парраметов посты и метод сортировки - сортировка постов
export const useSortedPosts = (posts, sort) => {
    // СОРТИРОВКА - используем state 'filter'
    // отсортированный массив (или по умолчанию, если сортировка не применялась) - помещаем в PostLists
    //  мемоизация - следим за выбранным алгоритмом сортировки и за изменением массива с постами 'posts'
    const sortedPosts = useMemo(() => {
        console.log(sort); //  пусто по умолчанию, после выбора - title или body
        console.log('SORTING FUNCTION EXECUTED');
            // проверка на 'пустой' filter.sort
            // если на пустой, то возвращаем отсортированный массив
        if (sort) {
            // механизм сортировки
            // так как функция .sort не создает новый массив, а мутирует тот к которому применен - в нашем случае это state 'posts'
            // а state напрямую нельзя мутировать(изменять), поэтому мы 'разворачиваем' существующий массив posts (создаем копию) и мутируем его
            //функция .sort принимает callback который аргументами примает два элемента массива
            // "выцепляем" выбор пользователя (title или body) и мпользуем функцию localeCompare для сравнения строк
            // сравниваем поле из объекта (а) с полем из объекта (b) - поля title или body
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        // иначе возвращаем обычный массив постов
        return posts;
    }, [sort, posts])

    return sortedPosts;  // массив отсортированных постов
}


//  кастомный хук - возвращает отфильтрованный и отсортированный массив
// аргументы: посты, метод сортировки и поисковый запрос
export const usePosts = (posts, sort, query) => {

    const sortedPosts = useSortedPosts(posts, sort);   // получаем массив отсортированных постов

    // ПОИСК - используем state 'filter' - поиск по 'title'
    // на основании отсортированного массива, зависимости - поисковая строка и отсортированный массив
    const sortedAndSearchPosts = useMemo(() => {
    //по поисковой строке фильтруем отсортированный массив постов
    // и отключаем чувствительность к регистру как для искомого так и для условия поиска
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLocaleLowerCase()))
    }, [query, sortedPosts])

    return sortedAndSearchPosts;   // массив отсортированных и отфильтрованных

};
