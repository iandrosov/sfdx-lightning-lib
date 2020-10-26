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
        system.assertEquals(2,lst.size());
    }

    @isTest
    static void saveChildListValueTest(){
        Test.startTest();
        // This willl create single entry for Other - parent and Neew Val as Child
        ES_ComboListManagerCtrl.saveChildListValue('New Val');
        Test.stopTest();
        // Query new data
        List<List_Metadata__c> lst = [SELECT Id, Active__c, Reason_Value__c, Child_Value__c, Child_Label__c 
                                        FROM List_Metadata__c WHERE Child_Value__c = 'New Val'];
        system.assertEquals(1,lst.size());
        List_Metadata__c pick = (List_Metadata__c)lst[0];
        system.assertNotEquals(null,pick);
        system.assertEquals(false,pick.Active__c); // New values added NOT Active for Admin to edit
        system.assertEquals('Other',pick.Reason_Value__c);
    }
}
