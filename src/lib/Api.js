import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3005/client/',
})

export default api