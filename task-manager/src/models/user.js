const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error('invalid email')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        Validate(value) {
            if(value < 0) {
                throw new Error('age must be positive number')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value) {
           if(value.toLowerCase().includes('password')){
                throw new Error('password cannot contain or be password!!')
            }
        }
    }
})

// const me = new User({
//     name: 'Sarita ',
//     email: 'satITA@GMAIL.COM  ',
//     age: 79,
//     password: 'gtyh8765   '
// });
// console.log(me)

// me.save().then(() => {
//     console.log(me)
// }).catch((err) => {
//     console.log('Error',err);
// })

module.exports = User;
