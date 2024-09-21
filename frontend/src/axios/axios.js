import axios from 'axios'

const apiInstance = axios.create({

    baseURL: 'https://kiddos.cloud/api/',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
});

export default apiInstance