import axios from 'axios';

function axiosAuth() {
    const token = localStorage.getItem('token');

    return axios.create({
        headers : {
            "Authorization" : `${token}`
        }
    })
}


export default axiosAuth;
