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
                this.message = newVal
                this.$.show.disabled = newVal === null ? true : false;
                this.$.hide.disabled = true;
                this.$.cancel.disabled = newVal === null ? true : false;
            });

            nodecg.listenFor('showed-question', () => {
                this.$.hide.disabled = false;
            });
            nodecg.listenFor('hided-question', () => {
                
                for (var i = 0; i < boxMessages.value.length; i++) {
                    if (boxMessages.value[i].id === selectedMessage.value.id) {
                        console.log('found something');
                        boxMessages.value.splice(i, 1);
                        break;
                    }
                }

                
                selectedMessage.value = null;
            });
        }

        showMessage() {
            this.$.show.disabled = true;
            this.$.cancel.disabled = true;
            nodecg.sendMessage('show-question');
        }

        hideMessage() {
            this.$.hide.disabled = true;
            
            nodecg.sendMessage('hide-question');
        }
        cancelMessage() {
            selectedMessage.value = null;
        }
    }
    customElements.define(OwlCurrentQuestion.is, OwlCurrentQuestion);
})();