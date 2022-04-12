const express = require('express');
const Tasks = require('../models/task');
const router = new express.Router();

router.get('/tasks', async (req, res) => {
    try {
        const taskss= await Tasks.find({});
        res.send(taskss)
    } catch(e) {
        res.status(500).send();
    }
    // Tasks.find({}).then((task) => {
    //     res.send(task)
    // }).catch(e =>{
    //     res.status(500).send();
    // } )
});

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try{
        const task = await Tasks.findById(_id);
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
router.post('/tasks', async (req, res) => {
    const task = new Tasks(req.body);
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


router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdates = ["completed", "description", "_id"];
    const isValidOperation = updates.every(u => allowUpdates.includes(u));
    if(!isValidOperation) {
        return res.status(400).send('err: invalid parameters to update');
    }
    try{
        const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!task){
            return res.status(404).send('task not found')
        }
        res.send(task)
    }catch(e) {
        res.status(400).send(e)
    }
});

router.delete('/tasks/:id', async (req, res) => {
    try{
        const task = await Tasks.findByIdAndDelete(req.params.id);
        if(!task) {
           return res.status(400).send()
        }
        res.send(task)
    }catch(e) {
        return res.status(500).send(e)
    }
  
});

module.exports = router;