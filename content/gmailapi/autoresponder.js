var AutoResponder = {
    enableAutoReply: false,
    responseBodyHtml: "",
    enableEndTime: false,
    startTime: 0,
    endTime: 0,


    retrieve: function(email, onFinish){
        console.log("AutoResponder: retrieve");
        api.getAutoresponder(email, function(responder){
            AutoResponder.clear();
            console.log(responder["enableAutoReply"]);
            if (responder["enableAutoReply"]){
                AutoResponder.enableAutoReply = responder["enableAutoReply"];
                AutoResponder.responseBodyHtml = responder["responseBodyHtml"];
                AutoResponder.startTime = responder["startTime"];
                AutoResponder.endTime = responder["endTime"];
                console.log(AutoResponder.toJson());
            }
            onFinish();
        });
    },
    save: function(email, onFinish){
        api.postNewAutoresponder(email, function(){
            onFinish();
        });
    },

    clear: function(){
        AutoResponder.enableAutoReply = false;
        AutoResponder.responseBodyHtml = "";
        AutoResponder.enableEndTime = false;
        AutoResponder.startTime = 0;
        AutoResponder.endTime = 0;
    },


    toJson: function(){
        if (AutoResponder.enableEndTime){
            return{
                'enableAutoReply': AutoResponder.enableAutoReply,
                'responseSubject': 'Out of Office',
                'responseBodyHtml': AutoResponder.responseBodyHtml,
                'startTime': AutoResponder.startTime,
                'endTime': AutoResponder.endTime
            };
        }
        else{
            return{
                'enableAutoReply': AutoResponder.enableAutoReply,
                'responseSubject': 'Out of Office',
                'responseBodyHtml': AutoResponder.responseBodyHtml,
            };
        }
    }
}