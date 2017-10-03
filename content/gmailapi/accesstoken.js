var AccessToken = {
    token: "",
    expiration: new Date(),

    getAccessToken: function(email, onFinish){
        if (AccessToken.token && AccessToken.expiration.getTime() > Date.now()){
            onFinish(AccessToken.token);
        }
        else{
            api.getAccessToken(email, function(token){
                AccessToken.token = token["access_token"];
                AccessToken.expiration = token["expires_in"];
                onFinish(token);
            });
        }
    }
}