/**
 * Test class controller for LWC escomboMainList and escomboChildList
 * 
 * Author: A.I.
 */
@isTest
public class ES_ComboListManagerCtrlTest {
    @testSetUp
    static void setUpData(){
        List<List_Metadata__c> lst = new List<List_Metadata__c>();

        for (Integer i=1; i<3; i++){
            for(Integer j=1; j<3; j++){
                List_Metadata__c lm = new List_Metadata__c();
                lm.Active__c = true;
                lm.Reason_Value__c = 'Parent '+i;
                lm.Reason_Label__c = 'Parent '+i;
                lm.Child_Value__c = 'Child '+i+' : '+j;
                lm.Child_Label__c = 'Child '+i+ ' : '+j;
                lst.add(lm);
            }
        }
        List_Metadata__c lm = new List_Metadata__c();
        lm.Active__c = true;
        lm.Reason_Value__c = 'Other';
        lm.Reason_Label__c = 'Other';
        lst.add(lm);

        insert lst;
    }

    @isTest
    static void findParentComboListTest(){
        Test.startTest();
        List<List_Metadata__c> lst = ES_ComboListManagerCtrl.findParentComboList() ;
        Test.stopTest();

        system.assertEquals(3,lst.size());
    }

    @isTest
    static void findChildComboListTest(){
        Test.startTest();
        List<List_Metadata__c> lst = ES_ComboListManagerCtrl.findChildComboList('Parent 1');
        Test.stopTest();
        system.assertEquals(3,lst.size());
    }

    
}
