// In this example we are going to be creating two chat clients
// One will have the unread-messages plugin connected to the global channel
// The other will not, allowing you to easily see the diff

// get some references to functions
let rickSend = function () {};
let rickSubmit = function () {};
let rickActive = function () {};
let rickInactive = function () {};
let mortySend = function () {};
let mortySubmit = function () {};

// here we are creating two instances of chat-engine
// typically you will not do this more than once in a client side app,
// but we're having two users use the same page here
const rickClient = ChatEngineCore.create({
    publishKey: 'pub-c-c2a407d1-2771-4d22-9063-bd538c8d720f',
    subscribeKey: 'sub-c-72ef270e-c41a-11e7-8c2e-7612aca27832'
});

const mortyClient = ChatEngineCore.create({
    publishKey: 'pub-c-c2a407d1-2771-4d22-9063-bd538c8d720f',
    subscribeKey: 'sub-c-72ef270e-c41a-11e7-8c2e-7612aca27832'
});

// connect Rick to the network, and when it is successful, do some stuff
rickClient.connect('Rick');

rickClient.on('$.ready', () => {

    // * * * * *  start plugin specific code  * * * * *

    // attach the unread-messages plugin to the global channel for Rick
    rickClient.global.plugin(ChatEngineCore.plugin['chat-engine-unread-messages']());

    // mark rick as active, then update his UI element to show he has no unread messages
    rickActive = function () {

        rickClient.global.unreadMessages.active();
        $('#rick-count').html(rickClient.global.unreadCount || '');

    };

    // mark rick as inactive, which will notify the plugin to start counting again
    rickInactive = function () {

        rickClient.global.unreadMessages.inactive();

    };

    // when the plugin emits an unread event, update the UI element
    // bootstap automagically makes it go away if it's '' instead of 0
    rickClient.global.on('$unread', (payload) => {

        console.log(payload)

        console.log(payload.sender)

        $('#rick-count').html(rickClient.global.unreadCount || '');

    });

    // * * * * *  end plugin specific code  * * * * *

    // use rick's input box value as his message payload and clear it when you hit send
    rickSend = function () {

        rickClient.global.emit('message', {
            text: $('#rick-input').val()
        });

        $('#rick-input').val('');

        return false;

    };

    // hook up the enter key for maximum usability
    rickSubmit = function (e) {

        if (e.keyCode === 13) {
            rickSend();
        }
    };

    // when any message is emitted on the global channel add it to rick's chat log
    rickClient.global.on('message', (payload) => {

        $('#rick-output').append($('<p><strong>' + payload.sender.uuid + ':</strong> ' + payload.data.text + '</p>'));

    });

});

// connect Morty to the network, and when it is successful, do less stuff
mortyClient.connect('Morty');
mortyClient.on('$.ready', () => {

    // use morty's input box value as his message payload and clear it when you hit send
    mortySend = function () {

        mortyClient.global.emit('message', {
            text: $('#morty-input').val()
        });

        $('#morty-input').val('');

        return false;

    };

    // hook up the enter key for maximum usability
    mortySubmit = function (e) {

        if (e.keyCode === 13) {
            mortySend();
        }
    };

    // when any message is emitted on the global channel add it to rick's chat log
    mortyClient.global.on('message', (payload) => {

        $('#morty-output').append($('<p><strong>' + payload.sender.uuid + ':</strong> ' + payload.data.text + '</p>'));

    });

});
