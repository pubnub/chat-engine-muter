# Mute Plugin for ChatEngine

Adds the ability to mute a user in a ChatEngine Chat

### Quick Start

0. Have a ChatEngine server running already, instantiate a client and connect it
```js
const ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-key-here',
    subscribeKey: 'sub-key-here'
});

var me;

ChatEngine.connect('Username');
ChatEngine.on('$.ready', (data) => {
    me = data.me;
});
```

1. Attach this plugin to the channel you want, in this case global
```js
ChatEngine.global.plugin(ChatEngineCore.plugin['chat-engine-mute']({ me: me }));
```

2. Pass a user object to the muter to mute a user
```js
let user = ChatEngine.global.users['user-uuid'];
ChatEngine.global.muter.mute(user);
console.log(ChatEngine.global.muter.isMuted(user));
// true
```

3. Pass a user object to the muter to unmute a user
```js
let user = ChatEngine.global.users['user-uuid'];
ChatEngine.global.muter.umute(user);
console.log(ChatEngine.global.muter.isMuted(user));
// false
```

