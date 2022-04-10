// const geo = (address, cb) => {
//     setTimeout(() => {
//         const data = {
//             a: 1,
//             b: 2,
//         };
//         cb(data);
//     }, 2000);
// }

// geo('abcd', (d) => {
// console.log(d)
// })

// const add = (a, b, cb) => {
//     const sum = a+b;
//     setTimeout(() => {
// cb(sum);
//     },2000);
// }
// add(1, 2, (sum) => {
//     console.log(sum);
// })

const doWorkcallback = (callback) => {
    setTimeout(()=>{
        callback(undefined,'err');
    },2000);
}
doWorkcallback((error, result) => {
    if(error) {
        return console.log(error);
    };
    console.log(result)
});