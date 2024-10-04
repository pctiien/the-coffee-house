import axios from 'axios'

const baseUrl = 'http://localhost:8080'

const axiosClient = axios.create({
    baseURL : baseUrl,
    headers : {
        "Content-Type": "application/json"
    }
})

export default axiosClient