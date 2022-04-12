const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            if(a < 0 || b < 0) {
                return reject('number must be positive or 0')
            }
            resolve(a + b);
        }, 2000);
    });
}

const doWork = async () => {
    // throw new Error('wrong')
    // return 'Sarita';
    const sum = await add(1,89);
    const sum1 = await add(sum,2);
    const sum2 = await add(sum1,-2);
    return sum2;
}
doWork().then(result => {
    console.log('r',result)
}).catch(e => {
    console.log(e)
})