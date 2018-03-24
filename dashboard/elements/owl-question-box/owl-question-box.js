(function () {
    'use strict';

    const boxMessages = nodecg.Replicant('messages');
    const selectedMessage = nodecg.Replicant('selected-message');


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
            
        }

        selectMessage(event) {
            selectedMessage.value = event.model.item;
        }

        removeMessage(event) {
            boxMessages.value.splice(boxMessages.value.indexOf(event.model.item), 1);
        }
    }
    customElements.define(OwlQuestionBox.is, OwlQuestionBox);
})();