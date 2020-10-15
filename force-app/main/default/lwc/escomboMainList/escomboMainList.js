import { LightningElement, wire, track, api } from 'lwc';

import { publish, MessageContext } from 'lightning/messageService';
import LISTMC from '@salesforce/messageChannel/ListSelectorMessageChannel__c';
import findParentList from '@salesforce/apex/ES_ComboListManagerCtrl.findParentComboList';

export default class EscomboMainList extends LightningElement {
    //@track variantOptions = [{value: 'none' , label: 'none'},{value: 'Planning' , label: 'Planning and Advisory'},{value: 'Product' , label: 'Product'},{value: 'Other' , label: 'Other'}];
    @api cardtitle = 'Main List';
    @api variant = 'none';
    @track listOptions = [];

    @wire(MessageContext)
    messageContext;

    // When combo changes selected option fire event
    variantChange(event) {
        this.variant = event.target.value;
        this.sname = event.target.name;

        // Publish Lightning Message via channel ListSelectorMessageChannel__c
        let message = {variantValue: this.variant};
        publish(this.messageContext, LISTMC, message);
    }   

    @wire(findParentList)
    wiredParentList({ error, data }) {
        if (data) {
            //create array with elements which has been retrieved controller
            //here value will be Id and label of combobox will be Name
            for(var i=0; i<data.length; i++)  {
                this.listOptions = [...this.listOptions ,{value: data[i].Reason_Value__c, label: data[i].Reason_Label__c} ];                                   
            }                
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.listOptions = undefined;
        }
    }    
    //gettter to return items which is mapped with options attribute
    get variantOptions() {
        return this.listOptions;
    }
}