function AccessToken(){
    this.accessToken = "";
    this.expiration = new Date();

    this.getAccessToken = function(email, onFinish){
        if (accessToken && expiration.getTime() > Date.now()){
            onFinish(accessToken);
        }
        else{
            api.sendRefreshTokenRequest(email, function(token){
                accessToken = token["access_token"];
                expiration = token["expires_in"];
                onFinish(accessToken);
            });
        }
    }
}