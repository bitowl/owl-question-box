'use strict';

module.exports = function (nodecg) {

    const boxMessages = nodecg.Replicant('messages', {
        defaultValue: []
    });

    const selectedMessage = nodecg.Replicant('selected-message', {
        defaultValue: null
    });

    nodecg.listenFor('send-message', 'owl-twitch-chat', value => {
        boxMessages.value.push(value); 
    });

};
