const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(a + b);
        }, 2000);
    });
}
add(2, 3).then((sum) => {
    console.log(sum);
    return add(sum, 3);
}).then((sum2) => {
    console.log(sum2)
}).catch((e) => {
    console.log(e);
})
// const doWorkpromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject([1,2,3])
//     },2000);
// })
// doWorkpromise.then(result => console.log(result)).catch(err => console.log(err))