import { LightningElement, wire, track, api } from 'lwc';

import { publish, MessageContext } from 'lightning/messageService';
import LISTMC from '@salesforce/messageChannel/ListSelectorMessageChannel__c';

export default class EscomboMainList extends LightningElement {
    @track variantOptions = [{value: 'none' , label: 'none'},{value: 'Success Planning' , label: 'Success Planning and Advisory'},{value: 'Product Specialization' , label: 'Product Specialization'},{value: 'Other' , label: 'Other'}];
    @api cardtitle = 'Main List';
    @api variant = 'none';

    @wire(MessageContext)
    messageContext;

    variantChange(event) {
        this.variant = event.target.value;
        this.sname = event.target.name;

        // Publish Lightning Message via channel ListSelectorMessageChannel__c
        let message = {variantValue: this.variant};
        publish(this.messageContext, LISTMC, message);
    }   

}