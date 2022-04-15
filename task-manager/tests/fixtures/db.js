const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneid = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneid,
    name: 'u1',
    email: 'iuy@wert.com',
    password: 'qwer5432',
    tokens: [{
        token: jwt.sign({_id: userOneid},process.env.JWT_SECRET)
    }]
}

const userTwoid = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoid,
    name: 'u2',
    email: 'iu2y@wert.com',
    password: 'qwer5432',
    tokens: [{
        token: jwt.sign({_id: userTwoid},process.env.JWT_SECRET)
    }]
}
const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'task1',
    completed: false,
    owner: userOneid
}
const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'task2',
    completed: false,
    owner: userTwoid
}
const setUpdatabase = async ()=> {
    await User.deleteMany();
    await Task.deleteMany();
   await new User(userOne).save();
   await new User(userTwo).save();
   await new Task(taskOne).save();
   await new Task(taskTwo).save();
}
module.exports = {
    setUpdatabase,
    userOneid,
    userOne,
    userTwo,
    userTwoid
}