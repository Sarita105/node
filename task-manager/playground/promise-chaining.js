require('../src/db/mongoose');
const User = require('../src/models/user');
const Tasks = require('../src/models/task');

//id get id from db userid 1536

// User.findByIdAndUpdate('62544dcd27a36d7528a616a3', {age: 5}).then(user => {
//     console.log(user)
//     return User.countDocuments({age: 5})
// }).then((result) => {
//     console.log(result)
// }).catch(err => {
//     console.log(err)
// })

// Tasks.findByIdAndDelete('62545121a12a3a8ce81139fb').then(task => {
//     return Tasks.countDocuments({completed: false});
// }).then(result => {
//     console.log(result)
// }).catch(e => {
//     console.log(e)
// })

// const updateAgeAndCount = async (id, age) => {
//     const user = await User.findByIdAndUpdate(id, {age});
//     const count = await User.countDocuments({age});
//     return count;
// }
// updateAgeAndCount('62544dcd27a36d7528a616a3', 11).then(count => {
//     console.log(count)
// }).catch(e => {
//     console.log(e)
// })

const deleteAndCountTask = async (id) => {
    const deletedTask = await Tasks.findByIdAndDelete(id);
    const count = await Tasks.countDocuments({completed: false});
    return {deletedTask,count }
}
deleteAndCountTask('6254f7b0db955ba3e48a5a35').then(task => {
    console.log(task)
}).catch(e => {
    console.log(e)
})