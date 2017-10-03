function createNewAutoresponder(){
    var autoResponder = new AutoResponder();
    autoResponder.init();
    return autoResponder;
};


function AutoResponder(){
    this.enableAutoReply = false;
    this.responseSubject = "";
    this.responseBodyPlainText = ""
    this.responseBodyHtml = "";
    this.startTime = 0;
    this.endTime = 0;


    this.retrieve = function(email, onFinish){
        api.getAutoresponder(email, onFinish);
    };
    this.save = function(email, body){
        api.postNewAutoresponder(email, this, function(){});
    };


    this.toJson = function(){
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