var INVALID_DATE = "NaN-NaN-NaN";
var ACTIVE_TITLE = "Out of Office - Active";
var INACTIVE_TITLE = "Out of Office - Inactive";

var accounts = [];
var editor;
var scheduleCheckbox;
var startDatePicker;
var endDatePicker;
var accountsList;
var dialog;


/*Initialization*/
window.addEventListener("load", onLoad, false);

function onLoad(event){
    console.log("Dialog: Loading Out of Office Dialog...");
    window.removeEventListener("load", onLoad, false);

    dialog = document.getElementById("gmailOutOfOffice-OutOfOfficeDialog");
    editor = document.getElementById("messageEditor");
    checkbox = document.getElementById("checkbox");
    startDatePicker = document.getElementById("startDatePicker");
    endDatePicker = document.getElementById("endDatePicker");
    accountsList = document.getElementById("selectedAccount");

    dialog.setAttribute("title", INACTIVE_TITLE);
    editor.contentDocument.designMode = 'on';
    editor.makeEditable("html");
    accounts = getAllAccounts();
    addAccounts(accounts);
    selectAccount(accounts[0].username);
};

function addAccounts(accounts){
    console.log("Dialog: Adding Accounts");
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
    console.log("Dialog: Setting Content");
    AutoResponder.retrieve(email, function(){
        console.log("Applying Current Autoresponder");
        if (AutoResponder.enableAutoReply){
            dialog.setAttribute("title", ACTIVE_TITLE);
            if (AutoResponder.endTime){
                checkbox.setAttribute("checked", true);
                enableDates();
                var newStartDate = new Date();
                var newEndDate = new Date();
                newStartDate.setTime(AutoResponder.startTime);
                newEndDate.setTime(AutoResponder.endTime);
                setDates(newStartDate, newEndDate);
            }
            console.log(AutoResponder.responseBodyHtml);
            var htmlEditor = editor.getHTMLEditor(editor.contentWindow);
            htmlEditor.insertHTML(AutoResponder.responseBodyHtml);
        }
    });
}

function createDateString(date){
    if (isNaN(date.getTime())){
        date = new Date();
    }
    return date.toISOString().substring(0, 10);
};

function setDates(startDate, endDate){
    if (startDate){
        startDatePicker.value = createDateString(startDate);
    }
    if (endDate){
        endDatePicker.value = createDateString(endDate);
    }
};

function enableDates(){
    AutoResponder.enableEndTime = true;
    startDatePicker.removeAttribute("disabled");
    endDatePicker.removeAttribute("disabled");
};

function disableDates(){
    AutoResponder.enableEndTime = false;
    startDatePicker.setAttribute("disabled", "true");
    endDatePicker.setAttribute("disabled", "true");
};


/*UI Interactions*/
function selectionChanged(){
    console.log("Selection Changed Called");
    console.log(accounts[accountsList.selectedIndex].username);
    selectAccount(accounts[accountsList.selectedIndex].username);
};

function checkToggle(){
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
    dialog.setAttribute("title", ACTIVE_TITLE);
    AutoResponder.enableAutoReply = true;
    var htmlEditor = editor.getHTMLEditor(editor.contentWindow);
    AutoResponder.responseBodyHtml = htmlEditor.document.body.innerHTML;
    if (AutoResponder.enableEndTime){
        AutoResponder.startTime = startDatePicker.dateValue.getTime();
        AutoResponder.endTime = endDatePicker.dateValue.getTime();
    }
    console.log(AutoResponder.toJson());
    AutoResponder.save(accounts[accountsList.selectedIndex].username, function(){
        window.close();
    });

    return false;
};

function turnOff(){
    //Turns off the current Autoresponder
    console.log("Turning Autoresponder Off.");
    dialog.setAttribute("title", INACTIVE_TITLE);
    AutoResponder.enableAutoReply = false;
    AutoResponder.save(accounts[accountsList.selectedIndex].username, function(){
        window.close();
    });

    return false;
};

function cancel(){
    console.log("Cancel was pressed.")
    return true;
};