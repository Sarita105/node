const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true,
});
const Tasks = mongoose.model('Tasks',taskSchema )

// const mytask = new Tasks({
//     description: 'task1     '
// });

// mytask.save().then(() => {
//     console.log(mytask)
// }).catch((err) => {
//     console.log('Error',err);
// })
module.exports = Tasks;
