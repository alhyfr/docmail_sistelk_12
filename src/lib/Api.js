import axios from 'axios'

const api = axios.create({
    // baseURL: 'http://localhost:3005/client/',
    baseURL: 'https://rest1.sistelk.id/client/',
})

export default api