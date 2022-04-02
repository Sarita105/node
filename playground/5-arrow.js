const name = 'sarita';
const obj = {
    name,//equivalent to name:name
    age: 128
}

//destructuring
const obj2 ={
    name1: 'abcd',
    age: 908
}
const {name1: productNammme , age, rating = 5} = obj2;//new name to name1

const transaction = (type, {name1, age}) => {

}
transaction('order', obj2)