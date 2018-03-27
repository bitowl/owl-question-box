(function () {
    'use strict';

    const boxMessages = nodecg.Replicant('messages');
    const selectedMessage = nodecg.Replicant('selected-question');


    class OwlQuestionBox extends Polymer.MutableData(Polymer.Element) {
        static get is() {
            return 'owl-question-box';
        }

        ready() {
            super.ready();
            boxMessages.on('change', newVal => {
                this.messages = newVal;
            });
            selectedMessage.on('change', newVal => {
                this.sendButtonDisabled = newVal !== null;
            });

            nodecg.listenFor('delete-question', () => {
                this.deleteMessage();
            });

        }

        selectMessage(event) {
            selectedMessage.value = event.model.item;
        }

        confirmDeleteMessage(event) {
            this.messageToDelete = event.model.item;
            nodecg.getDialog('delete-question').open();
        }

        deleteMessage() {
            boxMessages.value.splice(boxMessages.value.indexOf(this.messageToDelete), 1);
        }
    }
    customElements.define(OwlQuestionBox.is, OwlQuestionBox);
})();