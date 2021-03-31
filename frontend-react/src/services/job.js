import Axios from 'axios';

//const api_url = 'https://salaryfy-api.herokuapp.com/v1/jobs';
const api_url = 'http://localhost:5000/v1/jobs';

export const getJobs = () => {

    return Axios.get(`${api_url}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err)
        });
};

export const getJob = (jobId) => {
    return Axios.get(`${api_url}/${jobId}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(response => {
        return response.data;
    }).catch(err => {
        console.log(err);
    })
};

export const createJob = (jobId) => {
    return Axios.post(`${api_url}`, jobId, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
        })
};

export const completeJob = (jobId, trueOrFalse) => {
    return Axios.put(`${api_url}/complete/${jobId}`, { completed: trueOrFalse }, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(response => {
        return response.data;
    }).catch(err => {
        console.log(err);
    });
};

export const getCompletedJobs = () => {
    return Axios.get(`${api_url}/completed`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(response => {
        return response.data;
    }).catch(err => {
        console.log(err)
    });
};

export const updateJob = (jobId, updateQueryJob) => {
    return Axios.put(`${api_url}/${jobId}`, updateQueryJob, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(response => {
        return response.data;
    }).catch(err => {
        console.log(err);
    });
};

export const deleteJob = (jobId) => {
    return Axios.delete(`${api_url}/${jobId}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(response => {
        return response.data;
    }).catch(err => {
        console.log(err);
    });
};