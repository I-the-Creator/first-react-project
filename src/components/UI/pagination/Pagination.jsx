import React from 'react';
import { getPagesArray } from '../../../utils/pages';


// в аргументах:  сколько всего страниц (для создания массива элементов),
// номер текущей страницы, функция изменения номера

const Pagination = ({totalPages, page, changePage}) => {

    // Листание страниц и нумерация- пагинация
    // на отсновании массива номеров [1, ... 10] рисуем кнопки при нажатии на которые будет меняться страница
    // массив заполняем в цикле на каждом рендере (пересчет при каждой перерисовке)
    let pagesArray = getPagesArray(totalPages)  // массив номеров страниц,
    // console.log(pagesArray)

    return (
            // КНОПКИ С НОМЕРАМИ СТРАНИЦ
            <div className="page__wrapper">
                {pagesArray.map(p =>   // иттерируемся по каждому элементу массива
                    // меняем класс по условию (равен ли элемент иттерации 'p' нашему текущему состоянию 'page')
                    <span
                        onClick={() => changePage(p)}  // обработка события при нажатии на span - изменяем состояние 'page'- changePage()
                        key={p}  // уникальный ключ
                        className={page === p ? 'page-button page__current' : 'page-button'}
                    >
                        {/* добавляем 'p' - номер страницы на каждой иттерации */}
                        {p}   
                    </span>    
                )}
            </div>
    );
};

export default Pagination;