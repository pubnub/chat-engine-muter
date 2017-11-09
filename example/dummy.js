// this script is just connecting a dummy user to the channel
// and making him send messages constantly

const dialog = ['Mesa called Jar-Jar Binks!', 'I spake!', 'How wude!', 'Ex-queeze-me!'];

// create an instance of chat-engine
const client = ChatEngineCore.create({
    publishKey: YOUR_PUBLISH_KEY,
    subscribeKey: YOUR_SUBSCRIBE_KEY
});

client.connect('JarJar');

client.on('$.ready', () => {

	speaker = setInterval(speak, 1000);

});

function speak () {

	client.global.emit('message', {
		text: dialog[Math.floor(Math.random() * dialog.length)]
	});

}