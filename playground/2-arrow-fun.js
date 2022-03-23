const eventss ={
    name: 'birthday party',
    guestList: ['sarita', 'cat', 'parrot'],
    fun(){
        //this is another way of standard function(){}
        //it is not arrow function
        console.log(this.name);
        this.guestList.forEach((guest)=>{
            console.log(guest+'is'+this.name)
        });
    },
    //or
    fun1: function(){
        //this is just an alternative where 'this' is event
    }
}
eventss.fun();
console.log('jj');