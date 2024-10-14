import { LightningElement, wire } from 'lwc';
import COMPONENT_COMMUNICATION_CHANNEL from '@salesforce/messageChannel/ComponentCommunicationChannel__c';
import { publish,unsubscribe,subscribe, MessageContext } from 'lightning/messageService';

export default class ComponentB extends LightningElement {
    @wire(MessageContext)
    messageContext;

    messageInput = '';
    subscription = null;
    receivedMessage = 'No Message Received Yet';

    connectedCallback() {
        if (!this.subscription) {
            this.subscription = subscribe(this.messageContext, COMPONENT_COMMUNICATION_CHANNEL, (payload) => {
                this.handleMessage(payload);
            });
        }
    }

    handleMessage(payload) {
        if (payload && payload.message) {
            this.receivedMessage = payload.message;
        }
    }

    handleSend(){
        const msgFromB=this.template.querySelector('lightning-input').value;
        const messagePayload={text:msgFromB};
        publish(this.messageContext, COMPONENT_COMMUNICATION_CHANNEL, messagePayload);
        
    }
}
