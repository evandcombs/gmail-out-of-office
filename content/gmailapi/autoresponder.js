var AutoResponder = {
    enableAutoReply: false,
    responseSubject: "",
    responseBodyPlainText: "",
    responseBodyHtml: "",
    startTime: 0,
    endTime: 0,


    retrieve: function(email, onFinish){
        api.getAutoresponder(email, onFinish);
    },
    save: function(email, body){
        api.postNewAutoresponder(email, this, function(){});
    },


    toJson: function(){
        return{
            "enableAutoReply": enableAutoReply,
            "responseSubject": response,
            "responseBodyPlainText": responseBodyPlainText,
            "responseBodyHtml": responseBodyHtml,
            "restrictToContacts": false,
            "restrictToDomain": false,
            "startTime": startTime,
            "endTime": endTime
        };
    }
}