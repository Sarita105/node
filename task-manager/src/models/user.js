const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Tasks = require('./task')
//to use middleware  
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }],
    avater: {
        type: Buffer,
    }
}, {
    timestamps: true,
});
userSchema.virtual('tasks', {
    ref: 'Tasks',
    localField: '_id',
    foreignField: 'owner'
})
//alternate way
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avater;
    return userObject;
}
//this  this would be one way to not send pw and tokens
// userSchema.methods.getPublicProfile = function() {
//     const user = this;
//     const userObject = user.toObject();
//     delete userObject.password;
//     delete userObject.tokens;
//     return userObject;
// }
//use normal function not arrow
userSchema.methods.generateAuthtoken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString()}, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if(!user) {
        throw new Error('can not login invalid email!')
    };
    
    const isMatch = await bcrypt.compare(password,user.password );
    if(!isMatch) {
        throw new Error('can not login invalid password!')
    }
    return user;
}
//setting up middleware use normal function not arrow
userSchema.pre('save', async function(next) {
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();//to let t=know that pre methods have been completed executing so that saving can happen
})
//remove task when remove user
userSchema.pre('remove', async function(next) {
    const user = this;
    await Tasks.deleteMany({owner: user._id})
    next();
})
const User = mongoose.model('User',userSchema )

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
