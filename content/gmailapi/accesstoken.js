var AccessToken = {
    token: "",
    expiration: 0,

    getAccessToken: function(email, onFinish){
        console.log("AccessToken: getAccessToken");
        console.log("AccessToken: " + AccessToken.expiration + " CurrentTime: " + Date.now());
        if (AccessToken.expiration > Date.now()){
            console.log("AccessToken: Not Expired");
            onFinish(AccessToken.token);
        }
        else{
            console.log("AccessToken: Expired or Does not Exist");
            api.getAccessToken(email, function(token){
                console.log("AccessToken: Access Token Retrieved: " + token["access_token"]);
                AccessToken.token = token["access_token"];
                AccessToken.expiration = Date.now() + token["expires_in"];
                console.log("ExpireTime: " + AccessToken.expiration);
                onFinish(AccessToken.token);
            });
        }
    }
}