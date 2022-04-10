//CRUD
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;
const {MongoClient, ObjectID} = require('mongodb');

const connectionURL ='mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// const id = new ObjectID();
// console.log(id)
// console.log(id.getTimestamp())
// console.log(id.id.length)
// console.log(id.toHexString().length)
MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
  if(error) {
      return console.log('wrong',error);
  }
  const db = client.db(databaseName)
  db.collection('users').findOne({_id: new ObjectID('xscvfgbhn56')}, (error, user) => {
    if(error) {
      return console.log('unable to find user');
    }
    console.log(user);
  })
  // db.collection('users').insertOne({
  //   _id: id,
  //   name:'Vikram',
  //   age:900
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('unable to insert user');
  //   };
  //   console.log(result.ops);
  // });
  // db.collection('users').insertMany([
  //   {
  //     name: 'name1',
  //     age: 879,
  //   }, {
  //     name: 'name2',
  //     age: 238,
  //   }
  // ], (error, result) => {
  //   if(error) {
  //     return console.log(error);
  //   };
  //   console.log(result.ops);
  // });
  // db.collection('tasks').insertMany([
  //   {
  //     task: 'do laundry',
  //     completed: false,
  //   }, {
  //     task: 'complete the course',
  //     completed: false,
  //   },{
  //     task: 'go shopping',
  //     completed: true,
  //   }
  // ], (error, result) => {
  //   if(error) {
  //     return console.log(error);
  //   };
  //   console.log(result.ops);
  // });
});