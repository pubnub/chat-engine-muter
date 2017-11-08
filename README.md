# Mute Plugin for Chat Engine

Adds the ability to mute a user in a ChatEngine Chat

### Quick Start

0. Have a ChatEngine server running already, instantiate a client and connect it
```js
const ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-key-here',
    subscribeKey: 'sub-key-here'
});

ChatEngine.connect('Username');
ChatEngine.on('$ready', () => { ... });
```

1. Attach this plugin to the channel you want, in this case global
```js
ChatEngine.global.plugin(ChatEngineCore.plugin['chat-engine-mute']());
```

2. Pass a user object to the plugin
```js
let user = ChatEngine.global.users['user-uuid'];
ChatEngine.global.mute(user);
```

