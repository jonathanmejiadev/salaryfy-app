import JobRepository from '../repositories/jobRepository';
import moment from 'moment';
import createError from 'http-errors';

const jobRepo = new JobRepository();

export const create = async (job, user) => {
    const { name, pricePerHour, client, technologies } = job;
    const earnings = 0;
    const seconds = 0;
    const time = '00:00:00';
    const completed = false;
    const date = moment().format('LL');
    const jobObj = {
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
    const createdJob = await jobRepo.save(jobObj, user);
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

//change job completed property to true or false
export const complete = async (jobId, completed) => {
    return await jobRepo.update(jobId, { completed })
};

export const updateById = async (jobId, jobUpdate) => {
    return await jobRepo.update(jobId, jobUpdate);
};

export const deleteById = async (jobId, user) => {
    const deletedJob = await jobRepo.delete(jobId, user);
    if (!deletedJob) throw new createError(404, 'Job not found');
    return;
};