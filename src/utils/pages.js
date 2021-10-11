// получение количества номеров страниц

// а аргумент -> общее кол-во постов из заголовка запроса и limit постов га странице
export const getPageCount = (totalCount, limit) => {
    // укругляем в большую сторону, если totalPosts не делится на цело
    return Math.ceil(totalCount / limit)   
}


// создание массива с номерами страниц
export const getPagesArray = (totalPages) => {
    let result = [];
    for (let i = 0; i < totalPages; i++) {
        result.push(i + 1);
    }
    return result;
}