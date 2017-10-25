module.exports = () => {

    class extension {

        construct() {
            this.muted = {};
        }

        isMuted(user) {
            let muted = this.muted[user.uuid] || false;
            return muted;
        }

        mute(user) {
            this.muted[user.uuid] = true;
        }

        unmute(user) {
            this.muted[user.uuid] = false;
        }

    };

    let muteFilter = (payload, next) => {

        if(payload && payload.sender && payload.chat && payload.chat.muter.isMuted(payload.sender)) {
            next(true); // reject message and stop it from emitting
        } else {
            next(null, payload);
        }

    };

    // attach methods to Chat
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
