/*Section: Initialization*/
window.addEventListener("load", onLoad, false);
function onLoad(event){
    window.removeEventListener("load", onLoad, false); 
    autoresponder = getAutoresponder(); //Function call dependent JS file - maybe use Dependency Injection
    
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


/*Section: Start-End Dates*/
function setDates(startDate, endDate){
    if (startDate && endDate){
        document.getElementById("startDatePicker").dateValue = startDate;
        document.getElementById("endDatePicker").dateValue = endDate;
    }
};
//Toggle Start and End Dates: On/Off
function checkToggle(){
    var datesCheckbox = document.getElementById("datesCheckbox");
    if (datesCheckbox){
        var checked = checkbox.hasAttribute("checked");
        if (checked){
            enableDates();
        }
        else{
            disableDates();
        }
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


/*Section: */
function turnOn(){
    //Send autoresponse data to Google
};
function turnoff(){
    //Turns off the current Autoresponder
};
function cancel(){
    return true;
};