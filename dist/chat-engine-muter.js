(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
    }

    /**
     * Check if a {@link User} is muted within the {@link Chat}.
     * @method muter"."isMuted
     * @ceextends Chat
     */
    isMuted(user) {
      let state = this.parent.meta;

      if (state && state.muted && state.muted[config.me.uuid] && state.muted[config.me.uuid].indexOf(user.uuid) >= 0) {
        return true;
      } else {
        return false;
      }
    }

    /**
     * Prevent all events emitted from this {@link User} from reaching {@link Chat}.
     * @method muter"."mute
     * @ceextends Chat
     */
    mute(user) {
      let state = this.parent.meta || {};

      if (!state.muted) {
        state.muted = {};
      }

      if (!state.muted[config.me.uuid]) {
        state.muted[config.me.uuid] = [];
      }

      state.muted[config.me.uuid].push(user.uuid);

      this.parent.update(state);
    }

    /**
     * Allow events from a {@link User} to be emitted again.
     * @method muter"."unmute
     * @ceextends Chat
     */
    unmute(user) {
      let state = this.parent.meta;

      if (state.muted && state.muted[config.me.uuid] && state.muted[config.me.uuid].indexOf(user.uuid) >= 0) {
        var index = state.muted[config.me.uuid].indexOf(user.uuid);

        state.muted[config.me.uuid].splice(index, 1);

        this.parent.update(state);
      }
    }

  };

  let muteFilter = (payload, next) => {
    let isOwnEvent = false;

    if (payload && payload.event && payload.event.indexOf('$.muter') > -1) {
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
    },
    middleware: {
      on: {
        '*': muteFilter
      }
    }
  }
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2NoYXQtZW5naW5lLXBsdWdpbi9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiLnRtcC93cmFwLmpzIiwicGFja2FnZS5qc29uIiwic3JjL3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiKGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgcGFja2FnZSA9IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpO1xuICAgIHdpbmRvdy5DaGF0RW5naW5lQ29yZS5wbHVnaW5bcGFja2FnZS5uYW1lXSA9IHJlcXVpcmUoJy4uL3NyYy9wbHVnaW4uanMnKTtcblxufSkoKTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJhdXRob3JcIjogXCJJYW4gSmVubmluZ3NcIixcbiAgXCJuYW1lXCI6IFwiY2hhdC1lbmdpbmUtbXV0ZXJcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjRcIixcbiAgXCJtYWluXCI6IFwic3JjL3BsdWdpbi5qc1wiLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJjaGF0LWVuZ2luZVwiOiBcIl4wLjkuNVwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImNoYWlcIjogXCJeNC4xLjJcIixcbiAgICBcIm1vY2hhXCI6IFwiXjQuMC4xXCJcbiAgfVxufVxuIiwiLyoqXG4gKiBQcmV2ZW50IGEge0BsaW5rIENoYXR9IGZyb20gZW1pdHRpbmcgZXZlbnRzIGZyb20gYSBzcGVjaWZpYyB7QGxpbmsgVXNlcn0uXG4gKiBAbW9kdWxlIGNoYXQtZW5naW5lLW11dGVcbiAqIEByZXF1aXJlcyB7QGxpbmsgQ2hhdEVuZ2luZX1cbiAqL1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQGV4YW1wbGVcbiAqIHVzZXJPYmplY3QgPSBjaGF0LnVzZXJzWyd1c2VyLXV1aWQnXTtcbiAqIGNoYXQucGx1Z2luKENoYXRFbmdpbmVDb3JlLnBsdWdpblsnY2hhdC1lbmdpbmUtbXV0ZSddKCkpO1xuICpcbiAqIC8vIG11dGUgdXNlclxuICogY2hhdC5tdXRlci5tdXRlKHVzZXJPYmplY3QpO1xuICpcbiAqIC8vIHVubXV0ZSB1c2VyXG4gKiBjaGF0Lm11dGVyLnVubXV0ZSh1c2VyT2JqZWN0KTtcbiAqXG4gKiAvLyBtdXRlIHN0YXR1c1xuICogY2hhdC5tdXRlci5pc011dGVkKHVzZXJPYmplY3QpO1xuICogLy8gZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoY29uZmlnID0ge30pID0+IHtcblxuICBjbGFzcyBleHRlbnNpb24ge1xuXG4gICAgY29uc3RydWN0KCkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGEge0BsaW5rIFVzZXJ9IGlzIG11dGVkIHdpdGhpbiB0aGUge0BsaW5rIENoYXR9LlxuICAgICAqIEBtZXRob2QgbXV0ZXJcIi5cImlzTXV0ZWRcbiAgICAgKiBAY2VleHRlbmRzIENoYXRcbiAgICAgKi9cbiAgICBpc011dGVkKHVzZXIpIHtcbiAgICAgIGxldCBzdGF0ZSA9IHRoaXMucGFyZW50Lm1ldGE7XG5cbiAgICAgIGlmIChzdGF0ZSAmJiBzdGF0ZS5tdXRlZCAmJiBzdGF0ZS5tdXRlZFtjb25maWcubWUudXVpZF0gJiYgc3RhdGUubXV0ZWRbY29uZmlnLm1lLnV1aWRdLmluZGV4T2YodXNlci51dWlkKSA+PSAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByZXZlbnQgYWxsIGV2ZW50cyBlbWl0dGVkIGZyb20gdGhpcyB7QGxpbmsgVXNlcn0gZnJvbSByZWFjaGluZyB7QGxpbmsgQ2hhdH0uXG4gICAgICogQG1ldGhvZCBtdXRlclwiLlwibXV0ZVxuICAgICAqIEBjZWV4dGVuZHMgQ2hhdFxuICAgICAqL1xuICAgIG11dGUodXNlcikge1xuICAgICAgbGV0IHN0YXRlID0gdGhpcy5wYXJlbnQubWV0YSB8fCB7fTtcblxuICAgICAgaWYgKCFzdGF0ZS5tdXRlZCkge1xuICAgICAgICBzdGF0ZS5tdXRlZCA9IHt9O1xuICAgICAgfVxuXG4gICAgICBpZiAoIXN0YXRlLm11dGVkW2NvbmZpZy5tZS51dWlkXSkge1xuICAgICAgICBzdGF0ZS5tdXRlZFtjb25maWcubWUudXVpZF0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgc3RhdGUubXV0ZWRbY29uZmlnLm1lLnV1aWRdLnB1c2godXNlci51dWlkKTtcblxuICAgICAgdGhpcy5wYXJlbnQudXBkYXRlKHN0YXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbGxvdyBldmVudHMgZnJvbSBhIHtAbGluayBVc2VyfSB0byBiZSBlbWl0dGVkIGFnYWluLlxuICAgICAqIEBtZXRob2QgbXV0ZXJcIi5cInVubXV0ZVxuICAgICAqIEBjZWV4dGVuZHMgQ2hhdFxuICAgICAqL1xuICAgIHVubXV0ZSh1c2VyKSB7XG4gICAgICBsZXQgc3RhdGUgPSB0aGlzLnBhcmVudC5tZXRhO1xuXG4gICAgICBpZiAoc3RhdGUubXV0ZWQgJiYgc3RhdGUubXV0ZWRbY29uZmlnLm1lLnV1aWRdICYmIHN0YXRlLm11dGVkW2NvbmZpZy5tZS51dWlkXS5pbmRleE9mKHVzZXIudXVpZCkgPj0gMCkge1xuICAgICAgICB2YXIgaW5kZXggPSBzdGF0ZS5tdXRlZFtjb25maWcubWUudXVpZF0uaW5kZXhPZih1c2VyLnV1aWQpO1xuXG4gICAgICAgIHN0YXRlLm11dGVkW2NvbmZpZy5tZS51dWlkXS5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICAgIHRoaXMucGFyZW50LnVwZGF0ZShzdGF0ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gIH07XG5cbiAgbGV0IG11dGVGaWx0ZXIgPSAocGF5bG9hZCwgbmV4dCkgPT4ge1xuICAgIGxldCBpc093bkV2ZW50ID0gZmFsc2U7XG5cbiAgICBpZiAocGF5bG9hZCAmJiBwYXlsb2FkLmV2ZW50ICYmIHBheWxvYWQuZXZlbnQuaW5kZXhPZignJC5tdXRlcicpID4gLTEpIHtcbiAgICAgIGlzT3duRXZlbnQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmKCFpc093bkV2ZW50ICYmIHBheWxvYWQgJiYgcGF5bG9hZC5zZW5kZXIgJiYgcGF5bG9hZC5jaGF0ICYmIHBheWxvYWQuY2hhdC5tdXRlciAmJiBwYXlsb2FkLmNoYXQubXV0ZXIuaXNNdXRlZChwYXlsb2FkLnNlbmRlcikpIHtcblxuICAgICAgcGF5bG9hZC5jaGF0LnRyaWdnZXIoJyQubXV0ZXIuZXZlbnRSZWplY3RlZCcsIHtcbiAgICAgICAgb3JpZ2luYWxFdmVudDogcGF5bG9hZC5ldmVudCxcbiAgICAgICAgc2VuZGVyOiBwYXlsb2FkLnNlbmRlci51dWlkLFxuICAgICAgICBjaGF0OiBwYXlsb2FkLmNoYXQub2JqZWN0aWZ5KClcbiAgICAgIH0pO1xuXG4gICAgICBuZXh0KHRydWUpOyAvLyByZWplY3QgbWVzc2FnZSBhbmQgc3RvcCBpdCBmcm9tIGVtaXR0aW5nXG5cbiAgICB9IGVsc2Uge1xuICAgICAgbmV4dChudWxsLCBwYXlsb2FkKTtcbiAgICB9XG5cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIG5hbWVzcGFjZTogJ211dGVyJyxcbiAgICBleHRlbmRzOiB7XG4gICAgICBDaGF0OiBleHRlbnNpb25cbiAgICB9LFxuICAgIG1pZGRsZXdhcmU6IHtcbiAgICAgIG9uOiB7XG4gICAgICAgICcqJzogbXV0ZUZpbHRlclxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19
