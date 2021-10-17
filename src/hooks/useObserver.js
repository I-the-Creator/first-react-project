
// observer принимает reference того элемента за которым необходимо наблюдать 
// и callback который будет выполняться когда элемент в зоне видисмости

import { useEffect, useRef } from "react/cjs/react.development";

// canLoad, isLoading - булеан флаги - ограничители
// canLoad - условие отрисовки страниц
// callback  - что делать при вызове хука
export const useObserver = (ref, canLoad, isLoading, callback) => {

    // переменная для Intersection Observer
    const observer = useRef();

    // для подгрузки новых постов при повялении в зоне видимсоти экрана пустого div - lastElement
// импользуем Intersection Observer API, 
// корневой элемент для слежки 'document' и его можно не указывать - он по умолчанию
    useEffect(() => {
        // если isLoading == true (индикатор загрузки), то новый observer не создается
        if (isLoading) return;

        // если observer уже создан и поле 'current' что-то находится то отключаем наблюдение за всеми элементами 
        // за которыми наблюдает observer в данный момент
        if(observer.current) observer.current.disconnect();

        // создание нового observer, cb - callback для метода Intersection Observer 
        var cb = function(entries, observer) {
            // массив наблюдаемых элементов, 
            // свойство isIntersecting: элемент в зоне видимости или нет?
            console.log(entries)
            // условие. получаем по [0] индексу наблюдаемый элемент из массива и проверить поле isIntersecting:
            /* Content excerpted, show below */
            // callback отработает только если page<TotalPages
            if(entries[0].isIntersecting && canLoad) {
                callback()
                // console.log('DIV in vizibility zone')
                // console.log(page) // номер текущей страницы
                // // если последний элемент в зоне видимости, изменяем номер страницы на 1
                // setPage(page + 1)
            }
        };
        // новый Intersection Observer помещаем в поле 'current' референса 
        observer.current  = new IntersectionObserver(cb);
        // за каким элементом буде наблюдать - метод observ 
        observer.current.observe(ref.current)
    }, [isLoading])

}