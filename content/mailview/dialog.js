var isOn = false;
window.addEventListener("load", onLoad, false);

function onLoad(event){
    window.removeEventListener("load", onLoad, false);
    authorizeClient();
    autoresponder = getAutoresponder();
    var startDate = new Date();
    var endDate = new Date();
    setDates(startDate, endDate);
    if (!autoresponder){
        toggleEnable(false);
    }
    else{
        toggleEnable(true);
        document.getElementById("hasAutoresponder").removeAttribute("hidden");
    }
};

function setDates(startDate, endDate){
    if (startDate && endDate){
        document.getElementById("startDatePicker").dateValue = startDate;
        document.getElementById("endDatePicker").dateValue = endDate;
    }
};
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
function enableElements(){
    document.getElementById("startDatePicker").removeAttribute("disabled");
    document.getElementById("endDatePicker").removeAttribute("disabled");
};
function disbaleElements(){
    document.getElementById("startDatePicker").setAttribute("disabled", "true");
    document.getElementById("endDatePicker").setAttribute("disabled", "true");
};


function turnOn(){
    //Send autoresponse data to Google
    console.log("Turn On was pressed.")
    return true;
};
function turnoff(){
    //Turns off the current Autoresponder
};
function cancel(){
    console.log("Cancel was pressed.")
    return true;
};