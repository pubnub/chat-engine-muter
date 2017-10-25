module.exports = () => {

    class extension {

        construct() {
            this.parent.muted = {};
        }

        isMuted(user) {
            let muted = this.parent.muted[user.uuid] || false;
            return muted;
        }

        mute(user) {
            this.parent.muted[user.uuid] = true;
        }

        unmute(user) {
            this.parent.muted[user.uuid] = false;
        }

    };

    let muteFilter = (payload, next) => {

        console.log('filter called')

        console.log(payload)

        if(payload && payload.chat) {
            console.log('payload chat')
            console.log(payload.chat)
        }

        // if(payload && payload.sender && payload.chat && payload.chat.isMuted(payload.sender)) {

        //     console.log('this user is muted');
        //     console.log(payload.sender.uuid);

        //     next(false); // reject message

        // } else {

        //     console.log('this user is not muted')

        //     next();
        // }
        //
        next(null, payload);

    };

    // attach methods to Chat
    return {
        namespace: 'mute',
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
