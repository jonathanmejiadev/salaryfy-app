import Job from '../models/job.model';
import User from '../models/user.model';
import moment from 'moment';

export const createJob = async (req, res) => {
    const { jobName, pricePerHour, clientName, technologies } = req.body;
    const user = req.user;
    const earnings = 0;
    const seconds = 0;
    const time = '00:00:00';
    const completed = false;
    const date = moment().format('LL');
    //console.log(user);
    const job = new Job({
        name: jobName,
        client: clientName,
        pricePerHour,
        earnings,
        seconds,
        time,
        completed,
        date,
        userOwner: user._id,
        technologies
    });
    console.log(job)
    try {
        await job.save();
        user.jobs.push(job);
        await user.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err.message });
    }
    return res.status(201).json({
        success: true,
        message: 'Saved job successfully',
        data: job
    });
};

export const getJobs = async (req, res) => {
    const { _id } = req.user;
    //const user = await User.findById(_id).populate('jobs',);
    const jobs = await Job.find({ userOwner: _id, completed: false });
    return res.status(200).json({ success: true, data: jobs });
};

export const getJob = async (req, res) => {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    return res.status(200).json({ success: true, data: job });

};

export const updateJob = async (req, res) => {
    const jobId = req.params.id;
    const updateQueryJob = { ...req.body };
    const updatedJob = await Job.findByIdAndUpdate(jobId, updateQueryJob, { new: true });
    return res.status(200).json({ success: true, message: 'Updated job', data: updatedJob });

};

export const deleteJob = async (req, res) => {
    const jobId = req.params.id;
    await Job.findByIdAndDelete(jobId);
    return res.status(200).json({ success: true, message: 'Deleted job' })

};

export const getCompletedJobs = async (req, res) => {
    const jobsCompleted = await Job.find({ completed: true });
    return res.status(200).json({ succes: true, data: jobsCompleted });
};

export const completeJob = async (req, res) => {
    const jobId = req.params.id;
    const { completed } = req.body;
    //const completedDate = moment().format('LL');
    console.log(completed);
    const updatedJob = await Job.findByIdAndUpdate(jobId, { completed }, { new: true });
    return res.status(200).json({ success: 'true', message: 'Job is now completed', data: updatedJob })
};