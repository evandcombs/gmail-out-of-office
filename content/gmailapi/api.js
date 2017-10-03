var api = {
    AUTORESPONDER_URL: "https://www.googleapis.com/gmail/v1/users/[EMAIL]/settings/vacation?access_token=",
    TOKEN_URL: "https://accounts.google.com/o/oauth2/token",
    CONTENT_TYPE: "Content-Type",
    CONTENT_HEADER: "application/x-www-form-urlencoded",
    GET: "GET",
    POST: "POST",

    postNewAutoresponder: function(email, autoresponder, onFinish){
        console.log("Sending New Autoresponder");
        AccessToken.getAccessToken(email, function(accessToken){
            var url = api.AUTORESPONDER_URL + accessToken; //string.replace("[EMAIL]", email);
            api.sendRequest(api.POST, url, "", function(response){
                onFinish();
            });
        });
    },
    getAutoresponder: function(email, onFinish){
        console.log("Retrieving Current Autoresponder");
        AccessToken.getAccessToken(email, function(accessToken){
            var url = api.AUTORESPONDER_URL + accessToken; //string.replace("[EMAIL]", email);
            api.sendRequest(api.GET, url, "", function(response){
                onFinish();
            });
        });
    },
    getAccessToken: function(email, onFinish){
        console.log("Requesting New Access Token");
        var refreshToken = getRefreshToken(email);
        var body = "client_id=" + CLIENT_ID + 
            "&client_secret=" + CLIENT_SECRET + 
            "&refresh_token=" + refreshToken + 
            "&grant_type=refresh_token"; 
        api.sendRequest(api.POST, api.TOKEN_URL, body, function(response){
            var token = JSON.parse(response);
            onFinish(token);
        });
    },
    getRefreshToken: function(email, authToken, onFinish){
        console.log("Requesting Refresh Token");
        var body = "code=" + authToken +
            "&client_id=" + CLIENT_ID +
            "&client_secret=" + CLIENT_SECRET +
            "&redirect_uri=" + REDIRECT_URL +
            "&grant_type=authorization_code";
        api.sendRequest(api.POST, api.TOKEN_URL, body, function(response){
            var token = JSON.parse(response);
            onFinish(token);
        });
    },

    sendRequest: function(type, url, body, onFinish){
        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            console.log("Request Status: " + request.status);
            if (request.readyState === 4) 
            {   
                switch(request.status){
                    case 200: //successful response recieved
                        console.log(request.response);
                        onFinish(request.response);
                        break;
                    default: //response returned as failure
                        console.log(request.response);
                        break;
                }
            }
        };
        request.open(type, url, true);
        request.setRequestHeader(this.CONTENT_TYPE, this.CONTENT_HEADER);
        request.send(body);
    }
}