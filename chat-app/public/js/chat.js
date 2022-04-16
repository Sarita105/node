const socket = io();
//elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput= $messageForm.querySelector('input');
const $messageFormButton= $messageForm.querySelector('button');
const $locationButton= document.querySelector('#send-location');
const $messages = document.querySelector('#messages');

//tempplates
const tempplates = document.querySelector('#message-tempplate').innerHTML;
const locationtempplates = document.querySelector('#location-tempplate').innerHTML;

//options
const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true})

socket.on('chatPerson', (message) => {
    console.log(message);
    const html = Mustache.render(tempplates, {
        message:message.text,
        createdAt:moment(message.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend',html)
})
socket.on('location', (locationlink) => {
    console.log(locationlink);
    const html = Mustache.render(locationtempplates, {
        locationlink:locationlink.loc,
        createdAt:moment(locationlink.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend',html)
})
$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    $messageFormButton.setAttribute('disabled', 'disabled');
    const search = e.target.elements.message;
    socket.emit('incriment', search.value, (err) => {
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();
        if(err) {
            return console.log(err)
        }
        console.log('delivered')
    })
})

$locationButton.addEventListener('click', () => {
   if(!navigator.geolocation) {
       return alert('geolocation not supported')
   }
   $locationButton.setAttribute('disabled', 'disabled');
   navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('sendlocation', {latitude:position.coords.latitude,longitude:position.coords.longitude}, (msg) => {
        console.log('delivered loc')
        $locationButton.removeAttribute('disabled');
    })
})
})

socket.emit('join', {username, room});