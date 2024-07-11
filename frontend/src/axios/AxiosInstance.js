import axios from "axios";
import { API_BASE_URL } from "../constants/urls";
import { refreshauthToken } from "./apiServers";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";


export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    async function (config) {

            const tokens = JSON.parse(localStorage.getItem('authTokens'));
            const accessToken = tokens.access;
            const refreshToken = tokens.refresh;
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
            const user = jwtDecode(accessToken)
            const isExp = dayjs.unix(user.exp).diff(dayjs()) < 1
            if(isExp){
                console.log('I was called');
                const res = await axios.post(`${API_BASE_URL}token/refresh/`,{refresh:refreshToken})
                if (res.status === 200 || res.status === 201){
                    config.headers.Authorization = `Bearer ${res.data.access}`
                    localStorage.setItem('authTokens', JSON.stringify(res.data));
                }else{
                    console.log(res)
                }

                // const res = refreshauthToken(refreshToken)
                // if (res.status === 200){
                //     config.headers.Authorization = `Bearer ${res.data.access}`;
                // }else{
                //     console.log(res, 'rsesultj_________');
                // }
            }
        } 
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export const axiosFormInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

// export const axiosInstanceUser = axios.create({
//     baseURL: API,
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });
// axiosInstanceUser.interceptors.request.use(
//     async function (config) {
//         const state = store.getState();
//         const accessToken = state.usertoken.access;
//         const refreshToken = state.usertoken.refresh;
//         if (accessToken) {
//             config.headers.Authorization = `Bearer ${accessToken}`;
//             const user = jwtDecode(accessToken)
//             const isExp = dayjs.unix(user.exp).diff(dayjs()) < 1
//             console.log('expp',isExp);
//             if(isExp){
//                 const res = await axios.post(`${API}/token/refresh`,{refresh: refreshToken})
//                 if (res.status === 200){
//                     // console.log('refresh',res);
//                     config.headers.Authorization = `Bearer ${res.data.access}`;
//                     store.dispatch(refreshUpdt(res.data.access));
//                 }else{
//                     console.log(res);
//                 }
//             }
//         } else {
//             // Handle the case when there's no access token
//             console.log('no access token');
//         }
//         return config;
//     },
//     function (error) {
//         return Promise.reject(error);
//     }
// );