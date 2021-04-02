import Axios from 'axios';

const api_url = 'https://salaryfy-api.herokuapp.com/v1/jobs';
//const api_url = 'http://localhost:5000/v1/jobs';

export const getJobs = () => {
    const config = {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    };

    return Axios.get(`${api_url}`, config)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err)
        });
};

export const getJob = (jobId) => {
    const config = {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    };

    return Axios.get(`${api_url}/${jobId}`, config).then(response => {
        return response.data;
    }).catch(err => {
        console.log(err);
    })
};

export const createJob = (jobId) => {
    const config = {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    };

    return Axios.post(`${api_url}`, jobId, config)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
        })
};

export const completeJob = (jobId, trueOrFalse) => {
    const config = {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    };

    return Axios.put(`${api_url}/complete/${jobId}`, { completed: trueOrFalse }, config).then(response => {
        return response.data;
    }).catch(err => {
        console.log(err);
    });
};

export const getCompletedJobs = () => {
    const config = {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    };

    return Axios.get(`${api_url}/completed`, config).then(response => {
        return response.data;
    }).catch(err => {
        console.log(err)
    });
};

export const updateJob = (jobId, updateQueryJob) => {
    const config = {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    };

    return Axios.put(`${api_url}/${jobId}`, updateQueryJob, config).then(response => {
        return response.data;
    }).catch(err => {
        console.log(err);
    });
};

export const deleteJob = (jobId) => {
    const config = {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    };

    return Axios.delete(`${api_url}/${jobId}`, config).then(response => {
        return response.data;
    }).catch(err => {
        console.log(err);
    });
};