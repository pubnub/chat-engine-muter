
const assert = require('chai').assert;
const mute = require('./src/plugin.js');

const ChatEngine = require('../chat-engine/src/index.js');

let pluginchat;
let CE;

describe('config', function() {

    it('should be configured', function() {

        CE = ChatEngine.create({
            publishKey: 'pub-c-c6303bb2-8bf8-4417-aac7-e83b52237ea6',
            subscribeKey: 'sub-c-67db0e7a-50be-11e7-bf50-02ee2ddab7fe',
        }, {
            endpoint: 'http://localhost:3000/insecure',
            globalChannel: 'test-channel'
        });

        assert.isOk(CE);

    });

});

describe('connect', function() {

    it('should be identified as new user', function(done) {

        CE.connect('robot-tester' + new Date(), {works: true}, 'auth-key');

        CE.on('$.ready', (data) => {

            assert.isObject(data.me);
            done();

        })

    });

});

describe('plugins', function() {

    it('should be created', function() {

        pluginchat = new CE.Chat('pluginchat' + new Date().getTime());
        pluginchat2 = new CE.Chat('pluginchat' + new Date().getTime());

        pluginchat.plugin(mute({}));
        pluginchat2.plugin(mute({}));

    });

    it('should be muted', function(done) {

        pluginchat.muter.mute(CE.me);

        pluginchat.on('message2', (payload) => {
            assert.fail();
        });

        pluginchat.on('$.muter.eventRejected', (payload) => {
            done();
        });

        pluginchat.emit('message2', 'test');

    });

    it('should not be muted', function(done) {

        pluginchat2.on('message2', (payload) => {
            assert.fail();
        });

        pluginchat2.emit('message2', 'test');

        done();

    });

});
