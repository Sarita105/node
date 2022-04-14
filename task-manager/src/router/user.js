const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');
const router = new express.Router();

//signup route public
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthtoken();
        res.status(201).send({user,token});
    } catch(e) {
        res.status(400).send(e);
    }
    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch((err) => {
    //     // res.status(400);
    //     // res.send(err);
    //     res.status(400).send(err);
    // })
});
//login route public
router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthtoken();
       // res.send({user: user.getPublicProfile(), token}); this would be one way to not send pw and tokens
       res.send({user, token});
    }catch(e) {
        res.status(400).send();
    }
});
router.post('/users/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
        await req.user.save();
        res.send();
    } catch(e) {
        res.status(500).send();
    }
})
router.post('/users/logoutall',auth, async (req, res) => {
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send();
    }catch(e) {
        res.status(500).send();
    }
})
router.get('/users/me',auth, async (req, res) => {
   res.send(req.user)
    // try {
    //     console.log(req.user)
    //     const users = await User.find({});
    //     res.send( users)
    // } catch(e) {
    //     res.status(500).send();
    // }
    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch(e =>{
    //     res.status(500).send();
    // } )
});

// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id;
//     try {
//         const user = await User.findById(_id);
//         if(!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch(e){
//         res.status(500).send()
//     }
    
//     // User.findById(_id).then((user) => {
//     //     if(!user) {
//     //         return res.status(404).send()
//     //     }
//     //     res.send(user)
//     // }).catch((e) => {
//     //     res.status(500).send()
//     // })
// })
// router.patch('/users/:id', async (req, res) => {
    router.patch('/users/me',auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdates = ["name", "email", "password", "age"];
    const isValidOperation = updates.every(u => allowUpdates.includes(u));
    if(!isValidOperation) {
        return res.status(400).send('err: invalid parameters to update');
    }
    try{
        // const user = await User.findById(req.params.id);
        const user = await req.user;
        updates.forEach(update => user[update] = req.body[update]);
        await user.save();
        //findByIdAndUpdate bypass middleware so we had to put runValidators also
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        // if(!user){
        //     return res.status(404).send('user not found')
        // }
        res.send(user)
    }catch(e) {
        res.status(400).send(e)
    }
});

// router.delete('/users/:id', async (req, res) => {
    router.delete('/users/me',auth, async (req, res) => {
    try{
        // const user = await User.findByIdAndDelete(req.params.id);
        // const user = await User.findByIdAndDelete(req.user._id);
        // if(!user) {
        //    return res.status(400).send()
        // }
        await req.user.remove();
        res.send(req.user)
    }catch(e) {
        return res.status(500).send(e)
    }
  
});
const avater = multer({
        // dest: 'images',
        // limits: {
        //     fileSize: 1000000//1mb
        // },
        fileFilter(req, file, cb) {
            // if(!file.originalname.endsWith('.pdf')) {
                if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return cb(new Error('upload the file'));
            };
            cb(undefined, true);
            // cb(new Error('upload the file'));
            // cb(undefined, true);
            // cb(undefined, false);
    
        }
    });
router.post('/users/me/avater', auth,avater.single('avater'),async (req,res) => {
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer();
    req.user.avater = buffer;
    //req.user.avater = req.file.buffer;
    await req.user.save();
    res.send();
}, (error, req,res,next)=>{
    res.status(400).send({error: error.message});
});
//delete avater
router.delete('/users/me/avater', auth,async (req,res) => {
    req.user.avater = undefined;
    await req.user.save();
    res.send();
}, (error, req,res,next)=>{
    res.status(400).send({error: error.message});
})
router.get('/users/:id/avater', async(req,res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user || !user.avater) {
            throw new Error('cannot find avater');
        }
//set up res header
        res.set('Content-Type','image/png');
        res.send(user.avater)
    }catch(e) {
        res.status(404).send()
    }
})

module.exports = router;