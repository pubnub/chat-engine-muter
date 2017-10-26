/**
* Blocks all events from a {@link User} from being emitted.
* @module chat-engine-mute-user
* @requires {@link ChatEngine}
*/

/**
* Bind the plugin to a chat
* ```js
* chat = new CE.Chat('bad-chat');
* chat.plugin(muter());
* ```
*
* Mute a specific user
* ```js
* let user = new ChatEngine.user('bad-guy');
* chat.muteUser.mute(user);
* ```
*
* Chat will no longer receive any messages from "bad-guy"
*
* @function
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
