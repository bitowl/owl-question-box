'use strict';

module.exports = function (nodecg) {

    const boxMessages = nodecg.Replicant('messages', {
        defaultValue: []
    });

    const selectedMessage = nodecg.Replicant('selected-question', {
        defaultValue: null
    });

    const enabledRepl = nodecg.Replicant('enabled', {
        defaultValue: true
    });

    nodecg.listenFor('add-question', addQuestion);

    function addQuestion(question) {
        boxMessages.value.push(question); 
    }
    return addQuestion;
};
