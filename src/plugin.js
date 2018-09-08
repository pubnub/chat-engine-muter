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
        /**
        * Check if a {@link User} is muted within the {@link Chat}.
        * @method muter"."isMuted
        * @ceextends Chat
        */
        isMuted(user) {
            let state = this.parent.meta;

            if (state && state.muted && state.muted[config.me.uuid]
              && state.muted[config.me.uuid].indexOf(user.uuid) >= 0) {
                return true;
            }

            return false;
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
                let index = state.muted[config.me.uuid].indexOf(user.uuid);

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

        if (!isOwnEvent && payload && payload.sender && payload.chat && payload.chat.muter
          && payload.chat.muter.isMuted(payload.sender)) {

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
