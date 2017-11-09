(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.ChatEngineCore.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":2,"../src/plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "author": "Ian Jennings",
  "name": "chat-engine-mute",
  "version": "0.0.2",
  "main": "src/plugin.js",
  "dependencies": {
    "chat-engine": "^0.8.3"
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

        if(payload && payload.sender && payload.chat && payload.chat.muter.isMuted(payload.sender)) {

            payload.chat.trigger('$.muter.eventRejected', payload);

            next(true); // reject message and stop it from emitting

        } else {
            next(null, payload);
        }

    };

    return {
        namespace: 'muter',
        extends: {
            Chat: extension
        },
        middleware: {
            on: {
                '*': muteFilter
            }
        }
    }

}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni4xMS40L2xpYi9ub2RlX21vZHVsZXMvY2hhdC1lbmdpbmUtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL3dyYXAuanMiLCJwYWNrYWdlLmpzb24iLCJzcmMvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24oKSB7XG5cbiAgICBjb25zdCBwYWNrYWdlID0gcmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJyk7XG4gICAgd2luZG93LkNoYXRFbmdpbmVDb3JlLnBsdWdpbltwYWNrYWdlLm5hbWVdID0gcmVxdWlyZSgnLi4vc3JjL3BsdWdpbi5qcycpO1xuXG59KSgpO1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcImF1dGhvclwiOiBcIklhbiBKZW5uaW5nc1wiLFxuICBcIm5hbWVcIjogXCJjaGF0LWVuZ2luZS1tdXRlXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC4yXCIsXG4gIFwibWFpblwiOiBcInNyYy9wbHVnaW4uanNcIixcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiY2hhdC1lbmdpbmVcIjogXCJeMC44LjNcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJjaGFpXCI6IFwiXjQuMS4yXCIsXG4gICAgXCJtb2NoYVwiOiBcIl40LjAuMVwiXG4gIH1cbn1cbiIsIi8qKlxuKiBQcmV2ZW50IGEge0BsaW5rIENoYXR9IGZyb20gZW1pdHRpbmcgZXZlbnRzIGZyb20gYSBzcGVjaWZpYyB7QGxpbmsgVXNlcn0uXG4qIEBtb2R1bGUgY2hhdC1lbmdpbmUtbXV0ZVxuKiBAcmVxdWlyZXMge0BsaW5rIENoYXRFbmdpbmV9XG4qL1xuXG4vKipcbiogQGZ1bmN0aW9uXG4qIEBleGFtcGxlXG4qIHVzZXJPYmplY3QgPSBjaGF0LnVzZXJzWyd1c2VyLXV1aWQnXTtcbiogY2hhdC5wbHVnaW4oQ2hhdEVuZ2luZUNvcmUucGx1Z2luWydjaGF0LWVuZ2luZS1tdXRlJ10oKSk7XG4qIFxuKiAvLyBtdXRlIHVzZXJcbiogY2hhdC5tdXRlci5tdXRlKHVzZXJPYmplY3QpO1xuKiBcbiogLy8gdW5tdXRlIHVzZXJcbiogY2hhdC5tdXRlci51bm11dGUodXNlck9iamVjdCk7XG4qIFxuKiAvLyBtdXRlIHN0YXR1c1xuKiBjaGF0Lm11dGVyLmlzTXV0ZWQodXNlck9iamVjdCk7XG4qIC8vIGZhbHNlXG4qL1xubW9kdWxlLmV4cG9ydHMgPSAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGNsYXNzIGV4dGVuc2lvbiB7XG5cbiAgICAgICAgY29uc3RydWN0KCkge1xuICAgICAgICAgICAgdGhpcy5tdXRlZCA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICogQ2hlY2sgaWYgYSB7QGxpbmsgVXNlcn0gaXMgbXV0ZWQgd2l0aGluIHRoZSB7QGxpbmsgQ2hhdH0uXG4gICAgICAgICogQG1ldGhvZCBtdXRlclwiLlwiaXNNdXRlZFxuICAgICAgICAqIEBjZWV4dGVuZHMgQ2hhdFxuICAgICAgICAqL1xuICAgICAgICBpc011dGVkKHVzZXIpIHtcbiAgICAgICAgICAgIGxldCBtdXRlZCA9IHRoaXMubXV0ZWRbdXNlci51dWlkXSB8fCBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBtdXRlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAqIFByZXZlbnQgYWxsIGV2ZW50cyBlbWl0dGVkIGZyb20gdGhpcyB7QGxpbmsgVXNlcn0gZnJvbSByZWFjaGluZyB7QGxpbmsgQ2hhdH0uXG4gICAgICAgICogQG1ldGhvZCBtdXRlclwiLlwibXV0ZVxuICAgICAgICAqIEBjZWV4dGVuZHMgQ2hhdFxuICAgICAgICAqL1xuICAgICAgICBtdXRlKHVzZXIpIHtcbiAgICAgICAgICAgIHRoaXMubXV0ZWRbdXNlci51dWlkXSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgKiBBbGxvdyBldmVudHMgZnJvbSBhIHtAbGluayBVc2VyfSB0byBiZSBlbWl0dGVkIGFnYWluLlxuICAgICAgICAqIEBtZXRob2QgbXV0ZXJcIi5cInVubXV0ZVxuICAgICAgICAqIEBjZWV4dGVuZHMgQ2hhdFxuICAgICAgICAqL1xuICAgICAgICB1bm11dGUodXNlcikge1xuICAgICAgICAgICAgdGhpcy5tdXRlZFt1c2VyLnV1aWRdID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBsZXQgbXV0ZUZpbHRlciA9IChwYXlsb2FkLCBuZXh0KSA9PiB7XG5cbiAgICAgICAgaWYocGF5bG9hZCAmJiBwYXlsb2FkLnNlbmRlciAmJiBwYXlsb2FkLmNoYXQgJiYgcGF5bG9hZC5jaGF0Lm11dGVyLmlzTXV0ZWQocGF5bG9hZC5zZW5kZXIpKSB7XG5cbiAgICAgICAgICAgIHBheWxvYWQuY2hhdC50cmlnZ2VyKCckLm11dGVyLmV2ZW50UmVqZWN0ZWQnLCBwYXlsb2FkKTtcblxuICAgICAgICAgICAgbmV4dCh0cnVlKTsgLy8gcmVqZWN0IG1lc3NhZ2UgYW5kIHN0b3AgaXQgZnJvbSBlbWl0dGluZ1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXh0KG51bGwsIHBheWxvYWQpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZXNwYWNlOiAnbXV0ZXInLFxuICAgICAgICBleHRlbmRzOiB7XG4gICAgICAgICAgICBDaGF0OiBleHRlbnNpb25cbiAgICAgICAgfSxcbiAgICAgICAgbWlkZGxld2FyZToge1xuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAnKic6IG11dGVGaWx0ZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19
