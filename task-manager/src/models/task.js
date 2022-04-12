const mongoose = require('mongoose');
const validator = require('validator');

const Tasks = mongoose.model('Tasks', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
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
