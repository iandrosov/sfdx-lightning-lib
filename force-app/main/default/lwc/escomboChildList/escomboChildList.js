import { LightningElement, wire, track, api } from 'lwc';

import { subscribe, MessageContext } from 'lightning/messageService';
import LISTMC from '@salesforce/messageChannel/ListSelectorMessageChannel__c';
import findChildList from '@salesforce/apex/ES_ComboListManagerCtrl.findChildComboList';

export default class EscomboChildList extends LightningElement {
    //@track variantOptions = [{value: 'none' , label: 'none'},{value: 'Planning' , label: 'Planning and Advisory'},{value: 'Product' , label: 'Product'},{value: 'Other' , label: 'Other'}];
    @track showOption = false;
    @api variant = 'none';
    @api childcardtitle = 'Child List';
    searchKey = '';
    @track listOptions = [];

    @wire(MessageContext)
    messageContext;
    subscription = null;
    parentSelectValue = 'none';

    variantChange(event) {
        this.variant = event.target.value;
        this.sname = event.target.name;
        // Selection change
        // TODO: To some action here
    }   
    
    handleKeyChange(event) {
        // TODO
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
    
    @wire(findChildList, {val: '$parentSelectValue'})
    wiredChildList({ error, data }) {
        if (data) {
            //create array with elements which has been retrieved controller
            //here value will be Id and label of combobox will be Name
            this.listOptions = []; // Clear list values here to fill in new list
            for(var i=0; i<data.length; i++)  {
                this.listOptions = [...this.listOptions ,{value: data[i].Child_Value__c, label: data[i].Child_Label__c} ];                                   
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