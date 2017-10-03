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
    isAuthorized(email, function(){
        setContent(email);
    });
};


/*UI Content*/
function setContent(email){
    AutoResponder.retrieve(email, function(){
        console.log("Applying Current Autoresponder");
        setDates(autoresponder.startTime, autoresponder.endTime);
        if (autoresponder.endTime > autoresponder.startTime){
            enableDates();
        }
        if (autoresponder.enableAutoReply){
            document.getElementById("hasAutoresponder").removeAttribute("hidden");
        }
    });
}

function setDates(startDate, endDate){
    if (startDate && endDate){
        document.getElementById("startDatePicker").dateValue = startDate;
        document.getElementById("endDatePicker").dateValue = endDate;
    }
};

function enableDates(){
    document.getElementById("startDatePicker").removeAttribute("disabled");
    document.getElementById("endDatePicker").removeAttribute("disabled");
};

function disableDates(){
    document.getElementById("startDatePicker").setAttribute("disabled", "true");
    document.getElementById("endDatePicker").setAttribute("disabled", "true");
};


/*UI Interactions*/
function selectionChanged(){
    console.log("Selection Changed Called");
    var accountsList = document.getElementById("selectedAccount");
    console.log(accounts[accountsList.selectedIndex].username);
    selectAccount(accounts[accountsList.selectedIndex].username);
};

function checkToggle(){
    var checkbox = document.getElementById("checkbox");
    if (checkbox){
        var checked = checkbox.hasAttribute("checked");
        if (checked){
            enableDates();
        }
        else{
            disableDates();
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