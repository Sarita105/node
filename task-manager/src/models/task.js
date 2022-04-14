const mongoose = require('mongoose');

const Tasks = mongoose.model('Tasks', {
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
    }
})

// const mytask = new Tasks({
//     description: 'task1     '
// });

// mytask.save().then(() => {
//     console.log(mytask)
// }).catch((err) => {
//     console.log('Error',err);
// })
module.exports = Tasks;
