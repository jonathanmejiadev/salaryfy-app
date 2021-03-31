import Axios from 'axios';

const base_api = 'https://salaryfy-api.herokuapp.com/v1';

export const loginService = (user) => {

    return Axios.post(`${base_api}/login`, user)
        .then(response => {
            return response.data;
        })
        .then(response => {
            const { access_token, type_token } = response;
            return { token: `${type_token} ${access_token}`, user: user.username };
        })
        .catch(error => {
            //console.log(error);
            return error;
        })

};

export const registerService = (user) => {
    return Axios.post(`${base_api}/register`, user)
        .then(response => {
            return response.data;
        }).catch(error => {
            return error;
        })
}