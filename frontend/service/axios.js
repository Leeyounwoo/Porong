import axios from 'axios';


const API = axios.create({
    baseURL: "http://k6c102.p.ssafy.io:8080",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default API;