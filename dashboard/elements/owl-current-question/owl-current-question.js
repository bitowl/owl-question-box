(function () {
    'use strict';

    const boxMessages = nodecg.Replicant('messages');
    const selectedMessage = nodecg.Replicant('selected-question');

    class OwlCurrentQuestion extends Polymer.Element {
        static get is() {
            return 'owl-current-question';
        }

        ready() {
            super.ready();
            selectedMessage.on('change', newVal => {
                this.isMessageSelected = newVal !== null;
                this.message = newVal;
                this.$.hide.disabled = newVal === null;
            });
        }

        hideMessage() {
            this.$.hide.disabled = true;
            nodecg.sendMessage('hide-question');

            setTimeout(() => {
                for (var i = 0; i < boxMessages.value.length; i++) {
                    if (boxMessages.value[i].id === selectedMessage.value.id) {
                        console.log('found something');
                        boxMessages.value.splice(i, 1);
                        break;
                    }
                }
                selectedMessage.value = null;
            }, 1000);
        }

        confirmDeleteAllQuestions() {
            nodecg.getDialog('delete-all-questions').open();
        }
    }
    customElements.define(OwlCurrentQuestion.is, OwlCurrentQuestion);
})();