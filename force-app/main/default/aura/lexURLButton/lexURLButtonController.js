({
	handleClick : function(component, event, helper) {
        var url = component.get("v.buttonURL");
        var openSameTab = component.get("v.urlOpenSameWindow");
        if(openSameTab == true){
        	window.open(url, "_self");
        }else{
            window.open(url);
        }
	}
})