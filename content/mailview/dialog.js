var accounts = [];
var authorizationTokens = [];
var autoresponder = {};


/*Initialization*/
window.addEventListener("load", onLoad, false);

function onLoad(event){
    console.log("Loading Out of Office Dialog...")
    window.removeEventListener("load", onLoad, false);

    accounts = getAllAccounts();
    addAccounts(accounts);
    authorizationTokens = getAllAuthorizationTokens();
    selectAccount(accounts[0].username);
};

function addAccounts(accounts){
    var accountsList = document.getElementById("selectedAccount");
    for (var i = 0; i < accounts.length; i++){
        console.log("Add " + accounts[i].username + " to accounts list.");
        accountsList.appendItem(accounts[i].username);
    }
    accountsList.selectedIndex = 0;
};


/*Account Switch*/
function selectAccount(email){
    var hasToken = checkForAuthorization(email);
    if (!hasToken){
        authorize(email), function(){
            authorizationTokens = getAllAuthorizationTokens();
            setContent();
        }
    }
    setContent();
};

function checkForAuthorization(email){
    console.log("Checking if " + email + " has been authorized.");
    if (authorizationTokens[email]){
        console.log("True");
        return true;
    }
    console.log("False");
    return false;
};


/*UI Content*/
function setContent(){
    //autoresponder = getAutoresponder();
    /*if (autoresponder){
        console.log("Applying Current Autoresponder");
        setDates(autoresponder.startTime, autoresponder.endTime);
        enableUI(true);
        document.getElementById("hasAutoresponder").removeAttribute("hidden");
    }*/
}

function setDates(startDate, endDate){
    if (startDate && endDate){
        document.getElementById("startDatePicker").dateValue = startDate;
        document.getElementById("endDatePicker").dateValue = endDate;
    }
};

function enableElements(){
    document.getElementById("startDatePicker").removeAttribute("disabled");
    document.getElementById("endDatePicker").removeAttribute("disabled");
};

function disbaleElements(){
    document.getElementById("startDatePicker").setAttribute("disabled", "true");
    document.getElementById("endDatePicker").setAttribute("disabled", "true");
};


/*UI Interactions*/
function checkToggle(){
    var checkbox = document.getElementById("checkbox");
    if (checkbox){
        var checked = checkbox.hasAttribute("checked");
        if (checked){
            enableElements();
        }
        else{
            disbaleElements();
        }
    }
};

function turnOn(){
    //Send autoresponse data to Google
    console.log("Turn On was pressed.")
    return true;
};

function turnoff(){
    //Turns off the current Autoresponder
    console.log("Turning Autoresponder Off.");
};

function cancel(){
    console.log("Cancel was pressed.")
    return true;
};