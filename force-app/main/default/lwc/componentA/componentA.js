import { LightningElement, wire } from 'lwc';
import COMPONENT_COMMUNICATION_CHANNEL from '@salesforce/messageChannel/ComponentCommunicationChannel__c';
import { publish, MessageContext } from 'lightning/messageService';

export default class ComponentA extends LightningElement {
   
    @wire(MessageContext)
    messageContext;
    subscription=null;
    
    handleClick(){
       const msgInput=this.template.querySelector('lightning-input').value;
       const payload={message:msgInput}
       publish(this.messageContext, COMPONENT_COMMUNICATION_CHANNEL,payload);
    }

  

    receivedFromB='No Message Received yet!!';

    handleBMessage(messagePayload){
        if (messagePayload && payload.text) {
            this.receivedFromB=messagePayload.text;
        }

    }

}