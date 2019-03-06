(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.ChatEngineCore.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":2,"../src/plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "author": "Ian Jennings",
  "name": "chat-engine-muter",
  "version": "0.0.5",
  "main": "src/plugin.js",
  "dependencies": {
    "chat-engine": "^0.9.21"
  },
  "devDependencies": {
    "chai": "^4.1.2",
    "mocha": "^4.0.1"
  }
}

},{}],3:[function(require,module,exports){
/**
* Prevent a {@link Chat} from emitting events from a specific {@link User}.
* @module chat-engine-mute
* @requires {@link ChatEngine}
*/

/**
* @function
* @example
* userObject = chat.users['user-uuid'];
* chat.plugin(ChatEngineCore.plugin['chat-engine-mute']());
*
* // mute user
* chat.muter.mute(userObject);
*
* // unmute user
* chat.muter.unmute(userObject);
*
* // mute status
* chat.muter.isMuted(userObject);
* // false
*/
module.exports = (config = {}) => {

    class extension {

        construct() {
            this.muted = {};
        }

        /**
        * Check if a {@link User} is muted within the {@link Chat}.
        * @method muter"."isMuted
        * @ceextends Chat
        */
        isMuted(user) {
            let muted = this.muted[user.uuid] || false;
            return muted;
        }

        /**
        * Prevent all events emitted from this {@link User} from reaching {@link Chat}.
        * @method muter"."mute
        * @ceextends Chat
        */
        mute(user) {
            this.muted[user.uuid] = true;
        }

        /**
        * Allow events from a {@link User} to be emitted again.
        * @method muter"."unmute
        * @ceextends Chat
        */
        unmute(user) {
            this.muted[user.uuid] = false;
        }

    };

    let muteFilter = (payload, next) => {

        let isOwnEvent = false;

        if(payload && payload.event && payload.event.indexOf('$.muter') > -1) {
            isOwnEvent = true;
        }

        if(!isOwnEvent && payload && payload.sender && payload.chat && payload.chat.muter && payload.chat.muter.isMuted(payload.sender)) {

            payload.chat.trigger('$.muter.eventRejected', {
                originalEvent: payload.event,
                sender: payload.sender.uuid,
                chat: payload.chat.objectify()
            });

            next(true); // reject message and stop it from emitting

        } else {
            next(null, payload);
        }

    };

    return {
        namespace: 'muter',
        extends: {
            Chat: extension
        }
        ,
        middleware: {
            on: {
                '*': muteFilter
            }
        }
    }

}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2NoYXQtZW5naW5lLXBsdWdpbi9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiLnRtcC93cmFwLmpzIiwicGFja2FnZS5qc29uIiwic3JjL3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiKGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgcGFja2FnZSA9IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpO1xuICAgIHdpbmRvdy5DaGF0RW5naW5lQ29yZS5wbHVnaW5bcGFja2FnZS5uYW1lXSA9IHJlcXVpcmUoJy4uL3NyYy9wbHVnaW4uanMnKTtcblxufSkoKTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJhdXRob3JcIjogXCJJYW4gSmVubmluZ3NcIixcbiAgXCJuYW1lXCI6IFwiY2hhdC1lbmdpbmUtbXV0ZXJcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjVcIixcbiAgXCJtYWluXCI6IFwic3JjL3BsdWdpbi5qc1wiLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJjaGF0LWVuZ2luZVwiOiBcIl4wLjkuMjFcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJjaGFpXCI6IFwiXjQuMS4yXCIsXG4gICAgXCJtb2NoYVwiOiBcIl40LjAuMVwiXG4gIH1cbn1cbiIsIi8qKlxuKiBQcmV2ZW50IGEge0BsaW5rIENoYXR9IGZyb20gZW1pdHRpbmcgZXZlbnRzIGZyb20gYSBzcGVjaWZpYyB7QGxpbmsgVXNlcn0uXG4qIEBtb2R1bGUgY2hhdC1lbmdpbmUtbXV0ZVxuKiBAcmVxdWlyZXMge0BsaW5rIENoYXRFbmdpbmV9XG4qL1xuXG4vKipcbiogQGZ1bmN0aW9uXG4qIEBleGFtcGxlXG4qIHVzZXJPYmplY3QgPSBjaGF0LnVzZXJzWyd1c2VyLXV1aWQnXTtcbiogY2hhdC5wbHVnaW4oQ2hhdEVuZ2luZUNvcmUucGx1Z2luWydjaGF0LWVuZ2luZS1tdXRlJ10oKSk7XG4qXG4qIC8vIG11dGUgdXNlclxuKiBjaGF0Lm11dGVyLm11dGUodXNlck9iamVjdCk7XG4qXG4qIC8vIHVubXV0ZSB1c2VyXG4qIGNoYXQubXV0ZXIudW5tdXRlKHVzZXJPYmplY3QpO1xuKlxuKiAvLyBtdXRlIHN0YXR1c1xuKiBjaGF0Lm11dGVyLmlzTXV0ZWQodXNlck9iamVjdCk7XG4qIC8vIGZhbHNlXG4qL1xubW9kdWxlLmV4cG9ydHMgPSAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGNsYXNzIGV4dGVuc2lvbiB7XG5cbiAgICAgICAgY29uc3RydWN0KCkge1xuICAgICAgICAgICAgdGhpcy5tdXRlZCA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICogQ2hlY2sgaWYgYSB7QGxpbmsgVXNlcn0gaXMgbXV0ZWQgd2l0aGluIHRoZSB7QGxpbmsgQ2hhdH0uXG4gICAgICAgICogQG1ldGhvZCBtdXRlclwiLlwiaXNNdXRlZFxuICAgICAgICAqIEBjZWV4dGVuZHMgQ2hhdFxuICAgICAgICAqL1xuICAgICAgICBpc011dGVkKHVzZXIpIHtcbiAgICAgICAgICAgIGxldCBtdXRlZCA9IHRoaXMubXV0ZWRbdXNlci51dWlkXSB8fCBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBtdXRlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAqIFByZXZlbnQgYWxsIGV2ZW50cyBlbWl0dGVkIGZyb20gdGhpcyB7QGxpbmsgVXNlcn0gZnJvbSByZWFjaGluZyB7QGxpbmsgQ2hhdH0uXG4gICAgICAgICogQG1ldGhvZCBtdXRlclwiLlwibXV0ZVxuICAgICAgICAqIEBjZWV4dGVuZHMgQ2hhdFxuICAgICAgICAqL1xuICAgICAgICBtdXRlKHVzZXIpIHtcbiAgICAgICAgICAgIHRoaXMubXV0ZWRbdXNlci51dWlkXSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgKiBBbGxvdyBldmVudHMgZnJvbSBhIHtAbGluayBVc2VyfSB0byBiZSBlbWl0dGVkIGFnYWluLlxuICAgICAgICAqIEBtZXRob2QgbXV0ZXJcIi5cInVubXV0ZVxuICAgICAgICAqIEBjZWV4dGVuZHMgQ2hhdFxuICAgICAgICAqL1xuICAgICAgICB1bm11dGUodXNlcikge1xuICAgICAgICAgICAgdGhpcy5tdXRlZFt1c2VyLnV1aWRdID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBsZXQgbXV0ZUZpbHRlciA9IChwYXlsb2FkLCBuZXh0KSA9PiB7XG5cbiAgICAgICAgbGV0IGlzT3duRXZlbnQgPSBmYWxzZTtcblxuICAgICAgICBpZihwYXlsb2FkICYmIHBheWxvYWQuZXZlbnQgJiYgcGF5bG9hZC5ldmVudC5pbmRleE9mKCckLm11dGVyJykgPiAtMSkge1xuICAgICAgICAgICAgaXNPd25FdmVudCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZighaXNPd25FdmVudCAmJiBwYXlsb2FkICYmIHBheWxvYWQuc2VuZGVyICYmIHBheWxvYWQuY2hhdCAmJiBwYXlsb2FkLmNoYXQubXV0ZXIgJiYgcGF5bG9hZC5jaGF0Lm11dGVyLmlzTXV0ZWQocGF5bG9hZC5zZW5kZXIpKSB7XG5cbiAgICAgICAgICAgIHBheWxvYWQuY2hhdC50cmlnZ2VyKCckLm11dGVyLmV2ZW50UmVqZWN0ZWQnLCB7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogcGF5bG9hZC5ldmVudCxcbiAgICAgICAgICAgICAgICBzZW5kZXI6IHBheWxvYWQuc2VuZGVyLnV1aWQsXG4gICAgICAgICAgICAgICAgY2hhdDogcGF5bG9hZC5jaGF0Lm9iamVjdGlmeSgpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbmV4dCh0cnVlKTsgLy8gcmVqZWN0IG1lc3NhZ2UgYW5kIHN0b3AgaXQgZnJvbSBlbWl0dGluZ1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXh0KG51bGwsIHBheWxvYWQpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZXNwYWNlOiAnbXV0ZXInLFxuICAgICAgICBleHRlbmRzOiB7XG4gICAgICAgICAgICBDaGF0OiBleHRlbnNpb25cbiAgICAgICAgfVxuICAgICAgICAsXG4gICAgICAgIG1pZGRsZXdhcmU6IHtcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgJyonOiBtdXRlRmlsdGVyXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==
