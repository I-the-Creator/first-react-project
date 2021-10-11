// hook для обработки индикации запросов к API - показ и сокрытие "крутилки"
// и обработка ошибок при запросе

import { useState } from "react/cjs/react.development"

// аргумент функции - callback -  некоторый запрос перед которым показываем "крутилку" и после выполнения которого, скрыть "крутилку"
export const useFetching = (callback) => {
    // создаем состояние отвечающее за загрузку - по умолчанию false
    const [isLoading, setIsLoading] = useState(false)
    // базовый кейс- состояние для обработки ошибок при запросе
    // пустая строка по умолчанию, если ошибка произойдет то помещаем ее текст в аргумент состояния
    const [error, setError] = useState('')  

    // фобработка fetch запроса и ошибок
    const fetching = async () => {
        try {
            setIsLoading(true);  // меняем state "крутилки" на true
            await callback();  // вызов функции fetch запроса

        } catch (e) {  // если произошла ошибка
            setError(e.message);   // помещаем в state текст ошибки

        } finally {
            setIsLoading(false);  // меняем state "крутилки" на false при любом исходе, неважно была ошибка или нет
        }
    }
//  возвращаем из хука результат функции 'fetching' - попадает в App.js, в параметр "fetchPosts" хука "useFetching"
// state isLoading и ошибку (postError в App.js)  - массив из трех элементов и его можно деструктуризировать
    return [fetching, isLoading, error]
}