import axios from "axios"



export default class PostService {

    // функция для получения массива постов и проверки что получаем именно массив
    // в getAll добавляем параметры запроса (query properties) в качестве аргументов, 10 постов на странице начиная с первой
    static async getAll(limit =10, page = 1) {

        // отлавливаем ошибку при запросе
        // try {
            // ЗАПРОС axios, вторым параметром в get передаем объект свойств которые будут добавлены к URL
                        // query parameters - limit & page
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _limit: limit,
                    _page: page
                }
            })
            // console.log(response.data)  // debug  - получаем список объектов (постов)
            // return response.data
            // console.log(response) // возвращаем response целиком для обращения к header и дальнейшей пагинации
            return response
        // } catch (error) {
        //     console.log(error)
        // }
    }

    // функция запроса на сервер по id поста
    static async getById(id) {
            // без query параметров
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
            return response
    }
}