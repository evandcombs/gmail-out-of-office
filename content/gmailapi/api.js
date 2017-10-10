var api = {
    AUTORESPONDER_URL: "https://www.googleapis.com/gmail/v1/users/me/settings/vacation?access_token=",
    TOKEN_URL: "https://accounts.google.com/o/oauth2/token",
    CONTENT_TYPE: "Content-Type",
    AUTH_HEADER: "X-Authorization",
    CONTENT_HEADER: "application/x-www-form-urlencoded",
    CONTENT_JSON: "application/json",
    BEARER: "Bearer",
    GET: "GET",
    POST: "POST",
    PUT: "PUT",

    postNewAutoresponder: function(email, onFinish){
        console.log("api: Sending New Autoresponder");
        AccessToken.getAccessToken(email, function(accessToken){
            var url = api.AUTORESPONDER_URL + accessToken;
            var body = JSON.stringify(AutoResponder.toJson());
            console.log(body);
            api.sendRequest(api.PUT, url, body, [api.CONTENT_JSON, accessToken], function(response){
                var autoResponder = JSON.parse(response);
                onFinish();
            });
        });
    },
    getAutoresponder: function(email, onFinish){
        console.log("api: Retrieving Current Autoresponder");
        AccessToken.getAccessToken(email, function(accessToken){
            var url = api.AUTORESPONDER_URL + accessToken;
            api.sendRequest(api.GET, url, "", [api.CONTENT_HEADER], function(response){
                var autoresponder = JSON.parse(response);
                onFinish(autoresponder);
            });
        });
    },
    getAccessToken: function(email, onFinish){
        console.log("api: Requesting New Access Token");
        var refreshToken = getRefreshToken(email);
        var body = "client_id=" + CLIENT_ID + 
            "&client_secret=" + CLIENT_SECRET + 
            "&refresh_token=" + refreshToken + 
            "&grant_type=refresh_token"; 
        api.sendRequest(api.POST, api.TOKEN_URL, body, [api.CONTENT_HEADER], function(response){
            var token = JSON.parse(response);
            onFinish(token);
        });
    },
    getRefreshToken: function(email, authToken, onFinish){
        console.log("api: Requesting Refresh Token");
        var body = "code=" + authToken +
            "&client_id=" + CLIENT_ID +
            "&client_secret=" + CLIENT_SECRET +
            "&redirect_uri=" + REDIRECT_URL +
            "&grant_type=authorization_code";
        api.sendRequest(api.POST, api.TOKEN_URL, body, [api.CONTENT_HEADER], function(response){
            var token = JSON.parse(response);
            onFinish(token);
        });
    },

    sendRequest: function(type, url, body, headers, onFinish){
        console.log("Sending Request: " + type + " " + url + "/" + body);
        var request = new XMLHttpRequest();
        request.open(type, url, true);
        request.setRequestHeader(api.CONTENT_TYPE, headers[0]);
        if (headers[1]){
            request.withCredentials = true;
            request.setRequestHeader(api.AUTH_HEADER, api.BEARER + " " + headers[1]);
        }
        request.onreadystatechange = function(){
            console.log("api: Request Status: " + request.status);
            if (request.readyState === 4) 
            {   
                console.log(request);
                console.log(request.response);
                switch(request.status){
                    case 200: //successful response recieved
                        onFinish(request.response);
                        break;
                    default: //response returned as failure
                        break;
                }
            }
        };
        try{
            request.send(body);
        }
        catch(e){
            console.log("ERROR: " + e);
        }
    }
}