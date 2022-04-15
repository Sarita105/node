const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const {
    setUpdatabase,
    userOneid,
    userOne
} = require('./fixtures/db');
beforeEach(setUpdatabase);

test('async signup call', async () => {
    const response = await request(app).post('/users').send({
        name: 'sarita',
        email: 'qwer@qwer.com',
        password: 'asdf234!'
    }).expect(201)
    const user =await User.findById(response.body.user._id);
    expect(user).not.toBeNull();
   
    expect(response.body).toMatchObject({
       token: user.tokens[0].token
    })
    expect(user.password).not.toBe('asdf234!')
})
test('async login call', async () => {
    const res =await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    const user =await User.findById(res.body.user._id);
    expect(user).not.toBeNull();
    expect(res.body).toMatchObject({
        token: user.tokens[1].token
     })
     expect(user.password).not.toBe('asdf234!')
})
test('async login call failure', async () => {
    await request(app).post('/users/login').send({
        email: 'iuy@weport.com',
        password: 'userOne.password'
    }).expect(400)
})
test('async read user call', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})
test('async read user call fail', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})
test('async delete user call', async () => {
    const res = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
        const user =await User.findById(userOne._id);
        expect(user).toBeNull();
})
test('async delete user call fail', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})
// test('upload avater', async ()=> {
//     await request(app)
//         .post('/users/me/avater')
//         .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//         .attach('avater','tests/fixtures/rest-api.jpg')
//         .expect(200)
//         const user = User.findById(userOneid)
//         expect(user.avater).toEqual(expect.any(Buffer))
// })
test('update user', async ()=> {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name:'df'
        })
        .expect(200)
})
test('update notuser', async ()=> {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            loc:'df'
        })
        .expect(400)
})