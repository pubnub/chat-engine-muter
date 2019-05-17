This repository is a part of the [ChatEngine Framework](https://github.com/pubnub/chat-engine).
For more information on building chat applications with PubNub, see our
[Chat Resource Center](http://www.pubnub.com/developers/chat-resource-center/).

# Mute Plugin for ChatEngine

Adds the ability to mute a user in a ChatEngine Chat

### Quick Start

0. Have a ChatEngine server running already, instantiate a client and connect it
```js
const ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-key-here',
    subscribeKey: 'sub-key-here'
});

ChatEngine.connect('Username');
ChatEngine.on('$.ready', () => { ... });
```

1. Attach this plugin to the channel you want, in this case global
```js
ChatEngine.global.plugin(ChatEngineCore.plugin['chat-engine-mute']());
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

## Support

- If you **need help**, have a **general question**, have a **feature request** or to file a **bug**, contact <support@pubnub.com>.
