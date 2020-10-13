import { LightningElement, wire, track, api } from 'lwc';

import { subscribe, MessageContext } from 'lightning/messageService';
import LISTMC from '@salesforce/messageChannel/ListSelectorMessageChannel__c';

export default class EsChildList extends LightningElement {
    @track variantOptions = [{value: 'none' , label: 'none'},{value: 'Success Planning' , label: 'Success Planning and Advisory'},{value: 'Product Specialization' , label: 'Product Specialization'},{value: 'Other' , label: 'Other'}];
    @track showOption = false;
    @api variant = 'none';
    @api childcardtitle = 'Child List';
    searchKey = '';

    @wire(MessageContext)
    messageContext;
    subscription = null;
    parentSelectValue = 'none';

    variantChange(event) {
        this.variant = event.target.value;
        this.sname = event.target.name;
        if(this.variant === 'Other'){
            this.showOption = true;
        }else{
            this.showOption = false;
        }

        // Creates the event with the selected Survey URL data.
        const selectedEvent = new CustomEvent('variantselected', { detail: this.variant });
        // Dispatches the event.
        this.dispatchEvent(selectedEvent);    
    }   
    
    handleKeyChange(event) {
        //TODO
    }

    // Handle Mesage
    connectedCallback() {
        this.handleSubscribe();
    }
    handleSubscribe() {
        if (this.subscription) {
            return;
        }
        this.subscription = subscribe(this.messageContext, LISTMC, (message) => {
            console.log(message.variantValue);
            this.parentSelectValue = message.variantValue;
            if(this.parentSelectValue === 'Other'){
                this.showOption = true;
            }else{
                this.showOption = false;
            }
    
        });
    }    
}