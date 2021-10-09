import axios from "axios"



export default class PostService {

    // функция для получения массива постов и проверки что получаем именно массив
    static async getAll() {

        // отлавливаем ошибку при запросе
        try {
            // ЗАПРОС
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
            // console.log(response.data)  // debug  - получаем список объектов (постов)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}