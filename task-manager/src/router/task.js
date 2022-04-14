const express = require('express');
const Tasks = require('../models/task');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/tasks',auth, async (req, res) => {
    // const task = new Tasks(req.body);
    const task = new Tasks({
        ...req.body,
        owner: req.user._id
    });
    try {
        await task.save();
        res.status(201).send(task);
    } catch(e) {
        res.status(400).send(err);
    }
    // task.save().then(() => {
    //     res.status(201).send(task);
    // }).catch((err) => {
    //     // res.status(400);
    //     // res.send(err);
    //     res.status(400).send(err);
    // })
});
// /tasks?completed=true
//pagination limit skip
// /task?sortBy=createdAt:asc
router.get('/tasks', auth, async (req, res) => {
    const match = {};
    const sort = {};
    if(req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = (parts[1] === 'asc') ? 1 : -1;
    }
    try {
        // const taskss= await Tasks.find({});
       // const taskss= await Tasks.find({owner: req.user._id});
       // await req.user.populate('tasks').execPopulate()
       await req.user.populate({
           path: 'tasks',
           match,
           options: {
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
            sort //asc 1 desc -1
           }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch(e) {
        res.status(500).send();
    }
    // Tasks.find({}).then((task) => {
    //     res.send(task)
    // }).catch(e =>{
    //     res.status(500).send();
    // } )
});

router.get('/tasks/:id',auth, async (req, res) => {
    const _id = req.params.id;
    try{
        // const task = await Tasks.findById(_id);
        const task = await Tasks.findOne({_id, owner: req.user._id});
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch(e) {
        res.status(500).send()
    }
    // Tasks.findById(_id).then((task) => {
    //     if(!task) {
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})



router.patch('/tasks/:id',auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdates = ["completed", "description", "_id"];
    const isValidOperation = updates.every(u => allowUpdates.includes(u));
    if(!isValidOperation) {
        return res.status(400).send('err: invalid parameters to update');
    }
    try{
        // const task = await Tasks.findById(req.params.id);
        const task = await Tasks.findOne({_id: req.params.id, owner: req.user._id});
        
       // const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!task){
            return res.status(404).send('task not found')
        }
        updates.forEach(update => task[update] = req.body[update]);
        await task.save();
        res.send(task)
    }catch(e) {
        res.status(400).send(e)
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    try{
        // const task = await Tasks.findByIdAndDelete(req.params.id);
        const task = await Tasks.findOneAndDelete({_id:req.params.id, owner: req.user._id });
        if(!task) {
           return res.status(400).send()
        }
        res.send(task)
    }catch(e) {
        return res.status(500).send(e)
    }
  
});

module.exports = router;