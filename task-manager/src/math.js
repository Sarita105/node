const calculateTip = (total, tipPercent = .25) => total + (total * tipPercent);
const farenheitoCelcius = temp => (temp - 32)/1.8;                                                                  
const cenciustoFarenheit = temp =>  (temp * 1.8) + 32;
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
module.exports = {
    calculateTip,
    farenheitoCelcius,
    cenciustoFarenheit,
    add
}