const doWorkpromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject([1,2,3])
    },2000);
})
doWorkpromise.then(result => console.log(result)).catch(err => console.log(err))