import Job from '../models/job.model';

class JobRepository {
    constructor() {
    }

    async save(job, user) {
        const createdJob = new Job(job);
        await createdJob.save();
        user.jobs.push(createdJob);
        await user.save();
        return createdJob;
    };

    async getAll(userId, completed) {
        return await Job.find({ userOwner: userId, completed });
    };

    async get(jobId) {
        return await Job.findById(jobId);
    }

    async update(jobId, jobUpdate) {
        return await Job.findByIdAndUpdate(jobId, jobUpdate, { new: true });
    }

    async delete(jobId) {
        return await Job.findByIdAndDelete(jobId);
    }

};

export default JobRepository;