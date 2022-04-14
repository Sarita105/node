const express = require('express');
require('./db/mongoose');
const userRouter = require('./router/user');
const taskRouter = require('./router/task');

const app = express();
const port = process.env.PORT || 3000;

//before all app.use -> express middleware -> (new req -> do something-> router handler)
// app.use((req, res, next) => {
//     // console.log(req.method,req.path);
//     // if(req.method === 'GET') {
//         res.status(503).send('under maintainance');
//     // }else {
//     //     next();
//     // }
   
// });

app.use(express.json());//parse all the json data

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('server is up on port'+port);
})

// const jwt = require('jsonwebtoken');
// // jwt containd three part seperated by "." 1st one is 64 bit header which contains the what the jwt is about.
// // 2nd part is payload. base 64 json data we provide ie the id we have provided.
// // 3rd is signature. to verify token.
// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abcd1234'}, 'myfirstjwye', {expiresIn: '7 days'});//1st arg is obj containing unique key and 2nd one is secret key/token
//     console.log(token);
//     const data = jwt.verify(token,'myfirstjwye' );
//     console.log(data)
// }
// myFunction();
// const bcrypt = require('bcryptjs');
// //hashing non reversible but encryption is reversible
// const myFunction = async () => {
//     try{
//         const password = 'Red1234!';
//         const hashedPassword = await bcrypt.hash(password, 8);
//         console.log(password)
//         console.log(hashedPassword)

//         const isMatch = await bcrypt.compare('Red1234!',hashedPassword )
//         console.log(isMatch)
//     }catch(e) {
//         console.log(e)
//     }
   
// }
// myFunction();
const pet = {
    name: 'cat',
}
pet.toJSON = function() {
    const pet = this;
    pet.age = 2;
    pet.name = 'tania';
    return pet;
}
console.log(JSON.stringify(pet));