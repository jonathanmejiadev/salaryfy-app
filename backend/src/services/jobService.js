import JobRepository from '../repositories/jobRepository';

const jobRepo = new JobRepository();

export const create = async (name, client, pricePerHour, technologies, user) => {
    const earnings = 0;
    const seconds = 0;
    const time = '00:00:00';
    const completed = false;
    const date = moment().format('LL');
    const job = {
        name,
        client,
        pricePerHour,
        earnings,
        seconds,
        time,
        completed,
        date,
        userOwner: user._id,
        technologies
    };
    const createdJob = await jobRepo.save(job, user);
    return createdJob;
};

//Get a list of all completed jobs
export const getCompleted = async (userId) => {
    return await jobRepo.getAll(userId, true);
};

//Get a list of all incompleted jobs
export const getIncompleted = async (userId) => {
    return await jobRepo.getAll(userId, false);
};

export const getById = async (jobId) => {
    return await jobRepo.get(jobId);
};

//change job completed property to completed(completed=true) or incompleted(completed=false) 
export const complete = async (jobId, completed) => {
    return await jobRepo.update(jobId, { completed })
};

export const updateById = async (jobId, jobUpdate) => {
    return await jobRepo.update(jobId, jobUpdate);
};

export const deleteById = async (jobId) => {
    return await jobRepo.delete(jobId);
};