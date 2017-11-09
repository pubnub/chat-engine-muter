// In this example we are going to create a chat client
// That will let you mute and unmute yourself
// (useful, I know)
const YOUR_PUBLISH_KEY = '';
const YOUR_SUBSCRIBE_KEY = '';

// just making sure you're paying attention
if (YOUR_PUBLISH_KEY === '' || YOUR_SUBSCRIBE_KEY === '') {
    alert('You forgot to enter your keys');
}

//    ________          __  ______            _          
//   / ____/ /_  ____ _/ /_/ ____/___  ____ _(_)___  ___ 
//  / /   / __ \/ __ `/ __/ __/ / __ \/ __ `/ / __ \/ _ \
// / /___/ / / / /_/ / /_/ /___/ / / / /_/ / / / / /  __/
// \____/_/ /_/\__,_/\__/_____/_/ /_/\__, /_/_/ /_/\___/ 
//                                  /____/               

// get a function reference
let toggleMute = function () {};
let speaker = {};

const ChatEngine = ChatEngineCore.create({
    publishKey: YOUR_PUBLISH_KEY,
    subscribeKey: YOUR_SUBSCRIBE_KEY
});

// connect ourselves to the network, and when it is successful, do some stuff
ChatEngine.connect('Username');

ChatEngine.on('$.ready', (data) => {
    
    // * * * * *  start plugin specific code  * * * * *

    ChatEngine.global.plugin(ChatEngineCore.plugin['chat-engine-mute']());

    // * * * * *  end plugin specific code  * * * * *
    
    toggleMute = function () {
        // get the user object of the uuid 'JarJar' from the global chat
    	let user = ChatEngine.global.users['JarJar'];

        // check to see the mute state of our target user
    	if (ChatEngine.global.muter.isMuted(user)) {

            // unmute user in global chat
    		ChatEngine.global.muter.unmute(user);
            dummyOn();

    	} else {

            // mute user in global chat
    		ChatEngine.global.muter.mute(user);
            dummyOff();

    	}

    };

    // when any message is emitted on the global channel add it to the chat log
    ChatEngine.global.on('message', (payload) => {

        $('#output').append($('<p><strong>' + payload.sender.uuid + ':</strong> ' + payload.data.text + '</p>'));

    });

});


// turn the dummy off when he's muted to keep errors out of the console
function dummyOff () {
    clearInterval(speaker);
    $('#submit').html('Unmute');
}

// turn the dummy back on when he's unmuted
function dummyOn () {
    speaker = setInterval(speak, 1000);
    $('#submit').html('Mute');
}


