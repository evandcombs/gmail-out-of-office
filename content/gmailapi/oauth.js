var OAUTH_URL = "https://accounts.google.com/o/oauth2/auth";
var REDIRECT_URL = "urn:ietf:wg:oauth:2.0:oob:auto";
var RESPONSE_TYPE = "code";
var SUCCCESS = "Success code=";
var CLIENT_ID = "767564213579-pf3v4le7grtcs6i8lb4efdh34t0nkpg7.apps.googleusercontent.com";
var SCOPES = "https://www.googleapis.com/auth/gmail.settings.basic";
var HOSTNAME = "chrome://gmailOutOfOffice/oauth";

function createAuthorizationURL(email){
    return  OAUTH_URL +
            "?response_type=" + RESPONSE_TYPE +
            "&client_id=" + CLIENT_ID +
            "&redirect_uri=" + REDIRECT_URL +
            "&scope=" + SCOPES +
            "&login_hint=" + email;
};

function authorize(email, finished){
    console.log("Authorizing " + email + " for Gmail Vacation Autoresponder");
    var wizard = openAuthorizationWindow(email);
    processToken(email, wizard, finished);
};

function openAuthorizationWindow(email){
    var wizard = window.open("chrome://gmailoutofoffice/content/gmailapi/authorization.xul", "SetupWindow", "chrome,resizable=no,scrollbars=no,status=no");
    wizard.addEventListener("load", function(){
        var url = createAuthorizationURL(email);
        console.log("OAuth URL: " + url);
        var browser = wizard.document.getElementById("browser");
        browser.loadURI(url);
    });
    return wizard;
};

function processToken(email, wizard, finished){
    wizard.addEventListener("mousemove", function mouseMoved(){
        var browser = wizard.document.getElementById("browser");
        var response = browser.contentTitle;
        if (response && response.indexOf(SUCCCESS) === 0){
            wizard.removeEventListener("mousemove", mouseMoved);
            var token = response.substring(SUCCCESS.length);
            saveToken(email, token);
            wizard.close();
            finished();
        }
    });
};

function saveToken(email, token){
    console.log("Saving Token for User: " + email + " Token: " + token);
    var loginManager = Components.classes["@mozilla.org/login-manager;1"].getService(Components.interfaces.nsILoginManager);
    var nsLoginInfo = new Components.Constructor("@mozilla.org/login-manager/loginInfo;1", Components.interfaces.nsILoginInfo, "init");
    var extLoginInfo = new nsLoginInfo(HOSTNAME, "User Refresh Token", null, email, token, "", "");
    loginManager.addLogin(extLoginInfo);
};