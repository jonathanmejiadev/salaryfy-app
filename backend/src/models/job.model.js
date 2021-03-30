import { Schema, model } from 'mongoose';

const JobSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        earnings: {
            type: Number,
            required: true
        },
        seconds: {
            type: Number,
            required: true
        },
        pricePerHour: {
            type: Number,
            required: true
        },
        completed: {
            type: Boolean,
            required: true
        },
        client: {
            type: String,
            required: true
        },
        userOwner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        date: {
            type: String,
            required: true
        }
        , technologies: {
            type: [String],
            required: true
        }
    }, {
    versionKey: false
});

export default model('Job', JobSchema);