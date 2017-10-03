var HOSTNAME = "oauth://gmailoutofoffice/refresh_token";
var gmailHostNames = ["imap://imap.googlemail.com", "imap://imap.gmail.com"];

function getAllAccounts(){
    console.log("Get All Accounts");
    var loginManager = Components.classes["@mozilla.org/login-manager;1"].getService(Components.interfaces.nsILoginManager);
    var array = [];
    var logins = loginManager.getAllLogins();
    console.log("Logins: " + logins);
    for (var i = 0; i < logins.length; i++){
        var hostname = logins[i].hostname;
        console.log("HostName: " + hostname);
        //if (hostname.indexOf("imap://imap.googlemail.com") === 0 || hostname.indexOf("imap://imap.gmail.com") === 0){
        if (gmailHostNames.indexOf(hostname) !== -1){
            array.push({
                username: logins[i].username,
                hostname: hostname,
                password: logins[i].password
            });
            console.log(array[array.length - 1]);
        }
    }
    console.log(array);
    return array;
};

function getAllRefreshTokens(){
    console.log("Get All Authorization Tokens");
    var loginManager = Components.classes["@mozilla.org/login-manager;1"].getService(Components.interfaces.nsILoginManager);
    var objects = {};
    var logins = loginManager.findLogins({}, HOSTNAME, "", "");
    for (var i = 0; i <logins.length; i++){
        console.log("Token: " + logins[i].username + " " + logins[i].password);
        objects[logins[i].username] = logins[i].password;
    }
    return objects;
};
function getRefreshToken(email){
    var tokens = getAllRefreshTokens();
    return tokens[email];
}

function isAuthorized(email, callback){
    console.log("Checking for Authorization");
    var authToken = getRefreshToken(email);
    if (!authToken){
        authorize((email), callback);
    }
    else{
        callback();
    }
};

function saveToken(email, token){
    console.log("Saving Token for Hostname: " + HOSTNAME + " User: " + email + " Token: " + token);
    var loginManager = Components.classes["@mozilla.org/login-manager;1"].getService(Components.interfaces.nsILoginManager);
    var nsLoginInfo = new Components.Constructor("@mozilla.org/login-manager/loginInfo;1", Components.interfaces.nsILoginInfo, "init");
    var extLoginInfo = new nsLoginInfo(HOSTNAME, HOSTNAME, null, email, token, "", "");
    loginManager.addLogin(extLoginInfo);
};