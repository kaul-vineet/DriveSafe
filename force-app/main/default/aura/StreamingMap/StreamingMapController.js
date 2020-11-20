({
    init: function (component, event, helper) {
        var empApi = component.find("empApi");
        var utilityAPI = component.find("utilitybar"); 
        // Error handler function that prints the error to the console.
        var errorHandler = function (message) {
            console.log("Received error ", message);
        }.bind(this);
        
        // Register error listener and pass in the error handler function.
        empApi.onError(errorHandler);
        
        var channel='/event/Violation_Events__e';
        var sub;
        
        // new events
        var replayId=-1;

        var callback = function (message) {
        // component.find('notifLib').showToast({
        //        "title": message.data.payload.Vehicle__c,
        //        "message": message.data.payload.Vehicle__c,
        //        "variant": "success"
        //		});
        
        utilityAPI.disableUtilityPopOut({disabled: true});
		utilityAPI.setUtilityHighlighted({ highlighted : true });  
        component.find('map').set('v.mapMarkers',[
            {
                location: {
                    Latitude: message.data.payload.Violation_Geolocation_Lat__c, // message.data.payload.Violation_Geolocation_Lat__c,
    				Longitude: message.data.payload.Violation_Geolocation_Long__c // message.data.payload.Violation_Geolocation_Long__c
                },
                title: message.data.payload.Vehicle__c,
                description: 'x',
                icon: 'utility:salesforce1'
            }
        ]);
		component.find('map').set('v.zoomLevel', 20);
        
        setTimeout($A.getCallback(function () {
            utilityAPI.setUtilityHighlighted({ highlighted : false });            
        }), 6000); 
            
        }.bind(this);
        
        // subscribe to channel
        empApi.subscribe(channel, replayId, callback).then(function(value) {
            console.log("Subscribed to channel " + channel);
            sub = value;
            component.set("v.sub", sub);
        });
    }
});