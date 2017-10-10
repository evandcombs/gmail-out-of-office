var OAUTH_URL = "https://accounts.google.com/o/oauth2/auth";
var SCOPES = "https://www.googleapis.com/auth/gmail.settings.basic";
var REDIRECT_URL = "urn:ietf:wg:oauth:2.0:oob";
var RESPONSE_TYPE = "code";
var CLIENT_ID = "868436546296-8rs1rtd5hddlg5r3f9d7fk6ljt5fnt93.apps.googleusercontent.com";
var CLIENT_SECRET = "b7CjHxkVKVyYsWJm0v-FHUYH";
var SUCCCESS = "Success code=";

function createAuthorizationURL(email){
    return  OAUTH_URL +
            "?response_type=" + RESPONSE_TYPE +
            "&client_id=" + CLIENT_ID +
            "&redirect_uri=" + REDIRECT_URL +
            "&scope=" + SCOPES +
            "&login_hint=" + email;
};


/*Authorize Client Token*/
function authorize(email, finished){
    console.log("Authorizing " + email + " for Gmail Vacation Autoresponder");
    var wizard = openAuthorizationWindow(email);
    processToken(email, wizard, finished);
};

function openAuthorizationWindow(email){
    console.log("Opening Authorization Window");
    var wizard = window.open("chrome://gmailoutofoffice/content/gmailapi/oauth.xul", "SetupWindow", "chrome,resizable=no,scrollbars=no,status=no");
    wizard.addEventListener("load", function(){
        var url = createAuthorizationURL(email);
        console.log(CLIENT_ID);
        console.log("Opening OAuth URL: " + url);
        var browser = wizard.document.getElementById("browser");
        browser.loadURI(url);
    });
    return wizard;
};

function processToken(email, wizard, finished){
    wizard.addEventListener("mousemove", function mouseMoved(){
        var browser = wizard.document.getElementById("browser");
        var response = browser.contentTitle;
        console.log("Browser ContentTitle: " + response);
        if (response && response.indexOf(SUCCCESS) === 0){
            console.log("Processing Authorization Token");
            wizard.removeEventListener("mousemove", mouseMoved);
            var authToken = response.substring(SUCCCESS.length);
            retrieveRefreshToken(email, authToken, finished);
            wizard.close();
        }
    });
};


/*Refresh Token*/
function retrieveRefreshToken(email, authToken, finished){
    api.getRefreshToken(email, authToken, function(token){
        saveToken(email, token["refresh_token"]);
        finished();
    });
}