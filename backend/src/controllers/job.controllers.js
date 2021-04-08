import * as jobService from '../services/jobService';
import { Success, SuccessMsg } from '../handlers/successHandler';


export const createJob = async (req, res, next) => {
    try {
        const job = req.body;
        const user = req.user;
        const newJob = await jobService.create(job, user);
        return res.status(201).json(new Success(newJob));
    } catch (err) {
        next(err);
    };
};

export const getJobs = async (req, res, next) => {
    try {
        const { _id: userId } = req.user;
        const jobs = await jobService.getIncompleted(userId);
        return res.status(200).json(new Success(jobs));
    } catch (err) {
        next(err);
    };
};

export const getJob = async (req, res, next) => {
    try {
        const jobId = req.params.id;
        const job = await jobService.getById(jobId);
        return res.status(200).json(new Success(job));
    } catch (err) {
        next(err);
    };
};

export const updateJob = async (req, res, next) => {
    try {
        const jobId = req.params.id;
        const updateQueryJob = { ...req.body };
        const updatedJob = await jobService.updateById(jobId, updateQueryJob);
        return res.status(200).json(new Success(updatedJob));
    } catch (err) {
        next(err);
    };
};

export const deleteJob = async (req, res, next) => {
    try {
        const jobId = req.params.id;
        const user = req.user;
        await jobService.deleteById(jobId, user);
        return res.status(200).json(new SuccessMsg('Job has been deleted'));
    } catch (err) {
        next(err);
    };
};

export const getCompletedJobs = async (req, res, next) => {
    try {
        const { _id: userId } = req.user
        const jobs = await jobService.getCompleted(userId);
        return res.status(200).json(new Success(jobs));
    } catch (err) {
        next(err);
    };
};

export const completeJob = async (req, res, next) => {
    try {
        const jobId = req.params.id;
        const { completed } = req.body;
        const job = await jobService.complete(jobId, completed);
        return res.status(200).json(new Success(job));
    } catch (err) {
        next(err);
    };
};