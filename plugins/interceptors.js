import axios from 'axios';
import {getAccessToken} from "../utils/cookieAuthen";

export default function setup() {
    axios.interceptors.request.use(function(config) {
        const token = getAccessToken();
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, function(err) {
        return Promise.reject(err);
    });
}
