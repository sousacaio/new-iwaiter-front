import axios from 'axios';
import { getToken } from "./auth";

const api = axios.create({
    baseURL: 'https://nest-heroku-demo456.herokuapp.com/v1/'
})
//api.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// api.interceptors.response.use(function (response) {
//     return response;
// }, function (error) {
//     if (401 === error.response.status) {
//         alert(error.response.data.message)
//     } else {
//         return Promise.reject(error);
//     }
// });
export default api;