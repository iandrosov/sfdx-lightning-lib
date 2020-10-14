({
	doInit : function(component, event, helper) {
        var fields = [];
        var fl = component.get("v.fieldsToDisplay").split(",");
        if(fl){
            
        	fl.forEach(function(field) {
            	fields.push(field); 
        	});
        	component.set("v.myFields", fields);
        	//component.find("recordViewForm").reloadRecord();
        }
    },
    onSuccess : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "The record has been Saved successfully."
        });
        toastEvent.fire();
    },
    onSubmit : function(component, event, helper) {
    },
    /** Do not show Load message - load handler removed fmor markup commented here
    onLoad : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Loaded!",
            "message": "The record has been Loaded successfully ."
        });
        toastEvent.fire();
        
    },
    **/
    onError : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Error!",
            "message": "Error."
        });
        toastEvent.fire();
    }
        
})