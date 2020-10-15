/**
 * Supporting class controller for LWC escomboMainList and escomboChildList
 * 
 * Author: A.I.
 */
public without sharing class ES_ComboListManagerCtrl {

    @AuraEnabled(cacheable=true)
    public static List<List_Metadata__c> findParentComboList() {
        List<List_Metadata__c> lmList = [SELECT Id, Name, Reason_Value__c, Reason_Label__c FROM List_Metadata__c];
        Map<String,List_Metadata__c> lmMap = new Map<String,List_Metadata__c>();
        for (List_Metadata__c lm : lmList){
            lmMap.put(lm.Reason_Value__c,lm);
        }
        return (List<List_Metadata__c>)lmMap.values();
    }
    // Give Value query all list
    @AuraEnabled(cacheable=true)
    public static List<List_Metadata__c> findChildComboList(String val) {
        List<List_Metadata__c> lmList = [SELECT Id, Name, Child_Value__c, Child_Label__c 
                                        FROM List_Metadata__c WHERE Reason_Value__c =: val];
        return lmList;
    }
}
