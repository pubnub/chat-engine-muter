(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.ChatEngineCore.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":2,"../src/plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "author": "Ian Jennings",
  "name": "chat-engine-muter",
  "version": "0.0.4",
  "main": "src/plugin.js",
  "dependencies": {
    "chat-engine": "^0.9.5"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni4xMS4wL2xpYi9ub2RlX21vZHVsZXMvY2hhdC1lbmdpbmUtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL3dyYXAuanMiLCJwYWNrYWdlLmpzb24iLCJzcmMvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgcGFja2FnZSA9IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpO1xuICAgIHdpbmRvdy5DaGF0RW5naW5lQ29yZS5wbHVnaW5bcGFja2FnZS5uYW1lXSA9IHJlcXVpcmUoJy4uL3NyYy9wbHVnaW4uanMnKTtcblxufSkoKTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJhdXRob3JcIjogXCJJYW4gSmVubmluZ3NcIixcbiAgXCJuYW1lXCI6IFwiY2hhdC1lbmdpbmUtbXV0ZXJcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjRcIixcbiAgXCJtYWluXCI6IFwic3JjL3BsdWdpbi5qc1wiLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJjaGF0LWVuZ2luZVwiOiBcIl4wLjkuNVwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImNoYWlcIjogXCJeNC4xLjJcIixcbiAgICBcIm1vY2hhXCI6IFwiXjQuMC4xXCJcbiAgfVxufVxuIiwiLyoqXG4qIFByZXZlbnQgYSB7QGxpbmsgQ2hhdH0gZnJvbSBlbWl0dGluZyBldmVudHMgZnJvbSBhIHNwZWNpZmljIHtAbGluayBVc2VyfS5cbiogQG1vZHVsZSBjaGF0LWVuZ2luZS1tdXRlXG4qIEByZXF1aXJlcyB7QGxpbmsgQ2hhdEVuZ2luZX1cbiovXG5cbi8qKlxuKiBAZnVuY3Rpb25cbiogQGV4YW1wbGVcbiogdXNlck9iamVjdCA9IGNoYXQudXNlcnNbJ3VzZXItdXVpZCddO1xuKiBjaGF0LnBsdWdpbihDaGF0RW5naW5lQ29yZS5wbHVnaW5bJ2NoYXQtZW5naW5lLW11dGUnXSgpKTtcbipcbiogLy8gbXV0ZSB1c2VyXG4qIGNoYXQubXV0ZXIubXV0ZSh1c2VyT2JqZWN0KTtcbipcbiogLy8gdW5tdXRlIHVzZXJcbiogY2hhdC5tdXRlci51bm11dGUodXNlck9iamVjdCk7XG4qXG4qIC8vIG11dGUgc3RhdHVzXG4qIGNoYXQubXV0ZXIuaXNNdXRlZCh1c2VyT2JqZWN0KTtcbiogLy8gZmFsc2VcbiovXG5tb2R1bGUuZXhwb3J0cyA9IChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgY2xhc3MgZXh0ZW5zaW9uIHtcblxuICAgICAgICBjb25zdHJ1Y3QoKSB7XG4gICAgICAgICAgICB0aGlzLm11dGVkID0ge307XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgKiBDaGVjayBpZiBhIHtAbGluayBVc2VyfSBpcyBtdXRlZCB3aXRoaW4gdGhlIHtAbGluayBDaGF0fS5cbiAgICAgICAgKiBAbWV0aG9kIG11dGVyXCIuXCJpc011dGVkXG4gICAgICAgICogQGNlZXh0ZW5kcyBDaGF0XG4gICAgICAgICovXG4gICAgICAgIGlzTXV0ZWQodXNlcikge1xuICAgICAgICAgICAgbGV0IG11dGVkID0gdGhpcy5tdXRlZFt1c2VyLnV1aWRdIHx8IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIG11dGVkO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICogUHJldmVudCBhbGwgZXZlbnRzIGVtaXR0ZWQgZnJvbSB0aGlzIHtAbGluayBVc2VyfSBmcm9tIHJlYWNoaW5nIHtAbGluayBDaGF0fS5cbiAgICAgICAgKiBAbWV0aG9kIG11dGVyXCIuXCJtdXRlXG4gICAgICAgICogQGNlZXh0ZW5kcyBDaGF0XG4gICAgICAgICovXG4gICAgICAgIG11dGUodXNlcikge1xuICAgICAgICAgICAgdGhpcy5tdXRlZFt1c2VyLnV1aWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAqIEFsbG93IGV2ZW50cyBmcm9tIGEge0BsaW5rIFVzZXJ9IHRvIGJlIGVtaXR0ZWQgYWdhaW4uXG4gICAgICAgICogQG1ldGhvZCBtdXRlclwiLlwidW5tdXRlXG4gICAgICAgICogQGNlZXh0ZW5kcyBDaGF0XG4gICAgICAgICovXG4gICAgICAgIHVubXV0ZSh1c2VyKSB7XG4gICAgICAgICAgICB0aGlzLm11dGVkW3VzZXIudXVpZF0gPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIGxldCBtdXRlRmlsdGVyID0gKHBheWxvYWQsIG5leHQpID0+IHtcblxuICAgICAgICBsZXQgaXNPd25FdmVudCA9IGZhbHNlO1xuXG4gICAgICAgIGlmKHBheWxvYWQgJiYgcGF5bG9hZC5ldmVudCAmJiBwYXlsb2FkLmV2ZW50LmluZGV4T2YoJyQubXV0ZXInKSA+IC0xKSB7XG4gICAgICAgICAgICBpc093bkV2ZW50ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFpc093bkV2ZW50ICYmIHBheWxvYWQgJiYgcGF5bG9hZC5zZW5kZXIgJiYgcGF5bG9hZC5jaGF0ICYmIHBheWxvYWQuY2hhdC5tdXRlciAmJiBwYXlsb2FkLmNoYXQubXV0ZXIuaXNNdXRlZChwYXlsb2FkLnNlbmRlcikpIHtcblxuICAgICAgICAgICAgcGF5bG9hZC5jaGF0LnRyaWdnZXIoJyQubXV0ZXIuZXZlbnRSZWplY3RlZCcsIHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBwYXlsb2FkLmV2ZW50LFxuICAgICAgICAgICAgICAgIHNlbmRlcjogcGF5bG9hZC5zZW5kZXIudXVpZCxcbiAgICAgICAgICAgICAgICBjaGF0OiBwYXlsb2FkLmNoYXQub2JqZWN0aWZ5KClcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBuZXh0KHRydWUpOyAvLyByZWplY3QgbWVzc2FnZSBhbmQgc3RvcCBpdCBmcm9tIGVtaXR0aW5nXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHQobnVsbCwgcGF5bG9hZCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lc3BhY2U6ICdtdXRlcicsXG4gICAgICAgIGV4dGVuZHM6IHtcbiAgICAgICAgICAgIENoYXQ6IGV4dGVuc2lvblxuICAgICAgICB9XG4gICAgICAgICxcbiAgICAgICAgbWlkZGxld2FyZToge1xuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAnKic6IG11dGVGaWx0ZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19
