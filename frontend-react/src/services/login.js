import Axios from 'axios';

const base_api = 'http://localhost:5000/v1';

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