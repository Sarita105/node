const {
    setUpdatabase,
    userOneid,
    userOne,
    userTwo,
    userTwoid
} = require('./fixtures/db');
beforeEach(setUpdatabase);
const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');

test('task', async () => {
    const response = await request(app).post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        description: 'sarita',
        owner: userOneid
    }).expect(201)
})
test('/task read', async() => {
    await request(app).get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})
