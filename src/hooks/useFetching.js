// hook для обработки запросов к API - показ и сокрытие "крутилки" во время запроса, сам запрос
// и обработка ошибок при запросе

 // возвращает массив элементов - 1)некоторая функция, 2)индикатор загрузки, 3)ошибка
 // в качестве параметра принимает асинхронный callback который будет возвращен в виде обертки первым элементом этого массива


import { useState } from "react/cjs/react.development"

// аргумент функции - callback -  некоторый запрос перед которым показываем "крутилку" и после выполнения которого, скрыть "крутилку"
export const useFetching = (callback) => { // callback - функция полученная из App.js в качестве аргумента
    // console.log(callback); //  debug
    // создаем состояние отвечающее за загрузку - по умолчанию false
    const [isLoading, setIsLoading] = useState(false)
    // базовый кейс- состояние для обработки ошибок при запросе
    // пустая строка по умолчанию, если ошибка произойдет то помещаем ее текст в аргумент состояния
    const [error, setError] = useState('')  

    // обработка fetch запроса и ошибок
    const fetching = async (...args) => {  // извлекаем аргументы из принятого callback
        // console.log(...args); //  debug
        try {
            setIsLoading(true)  // меняем state "крутилки" на true
            // console.log(callback);
            await callback(...args)  // вызов принятой функции fetch запроса, передаем туда принятые аргументы

        } catch (e) {  // если произошла ошибка
            setError(e.message)   // помещаем в state текст ошибки
            console.log(e) // debug

        } finally {
            setIsLoading(false)  // меняем state "крутилки" на false при любом исходе, неважно была ошибка или нет
        }
    }
//  возвращаем из хука результат функции 'fetching' - попадает в App.js, в параметр "fetchPosts" хука "useFetching"
// возвращает массив элементов - 1)некоторая функция, 2)индикатор загрузки, 3)ошибка
// state, isLoading и ошибка (postError в App.js)  - массив из трех элементов и его можно деструктуризировать
    return [fetching, isLoading, error]
}