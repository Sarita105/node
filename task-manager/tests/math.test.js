const {calculateTip, farenheitoCelcius, cenciustoFarenheit, add} = require('../src/math');

test('calculateTip', () => {
    const total = calculateTip(10, .3);
    expect(total).toBe(13);
})
test('calculateTipwith default tip', () => {
    const total = calculateTip(10);
    expect(total).toBe(12.5);
})
test('farenheitoCelcius', () => {
    const tempres = farenheitoCelcius(32);
    expect(tempres).toBe(0);
})
test('cenciustoFarenheit', () => {
    const tempres = cenciustoFarenheit(0);
    expect(tempres).toBe(32);
})
test('add promise', (done) => {
    add(2, 3).then(sum => {
        expect(sum).toBe(5);
        done();
    })
})
test('add async/await', async() => {
    const sum = await add(10,22);
    expect(sum).toBe(32);
})