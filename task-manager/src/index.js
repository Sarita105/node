const express = require('express');
require('./db/mongoose');
const userRouter = require('./router/user');
const taskRouter = require('./router/task');

const app = express();
const port = process.env.PORT
//"dev": "env-cmd ./config/dev.env nodemon src/index.js"

//before all app.use -> express middleware -> (new req -> do something-> router handler)
// app.use((req, res, next) => {
//     // console.log(req.method,req.path);
//     // if(req.method === 'GET') {
//         res.status(503).send('under maintainance');
//     // }else {
//     //     next();
//     // }
   
// });
//\.(doc|docx)$
// const multer = require('multer');
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000//1mb
//     },
//     fileFilter(req, file, cb) {
//         // if(!file.originalname.endsWith('.pdf')) {
//             if(!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('upload the file'));
//         };
//         cb(undefined, true);
//         // cb(new Error('upload the file'));
//         // cb(undefined, true);
//         // cb(undefined, false);

//     }
// });
// const errorMiddleware = (req, res, next) => {
//     throw new Error('err from img middlware!');
// }
// // upload.single('upload')
// app.post('/upload',upload.single('upload'), (req,res) => {
//     res.send()
// }, (error, req,res,next)=>{
//     res.status(400).send({error: error.message});
// })

app.use(express.json());//parse all the json data

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('server is up on port'+port);
})