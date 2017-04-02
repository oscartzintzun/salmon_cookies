// Store Objects
var CookieStore = function(location, min, max, avgSale) {
    this.location = location;
    this.min = min;
    this.max = max;
    this.avgSale = avgSale;
    this.cookieSimArray = [];
    this.custHourlySim = function() {
        return Math.floor(((Math.random() * (this.max - this.min)) + this.min) * this.avgSale);
    };
}

var storesArray = new Array();
storesArray.push(new CookieStore("Pioneer Place", 17, 88, 5.2));
storesArray.push(new CookieStore("Portland Airport", 6, 24, 1.2));
storesArray.push(new CookieStore("Washington Square", 11, 38, 1.9));
storesArray.push(new CookieStore("Sellwood", 20, 48, 3.3));
storesArray.push(new CookieStore("Pearl District", 3, 24, 2.6));

var storeHours = ["10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];

// function to build table
function domAppend(element, text, parent, index) {
    var elementName = document.createElement(element);
    var textNode = document.createTextNode(text);
    elementName.appendChild(textNode);
    var elementPosition = document.getElementsByTagName(parent)[index];
    elementPosition.appendChild(elementName);
}

//Create table header
function tableHeader() {
    for (var tableIndex = 0; tableIndex < storeHours.length; tableIndex++) {
        domAppend("th", storeHours[tableIndex], "tr", 0);
    };
    domAppend("th", "Total", "tr", 0);
}
tableHeader()

// Create store rows, get store names as row headers, populate with sales simulations
for (var storeIndex = 0; storeIndex < storesArray.length; storeIndex++) {
    cookiesHourlySim(storesArray[storeIndex]); // call function for each store

    function cookiesHourlySim(store) {
        console.log(storesArray.length);
        var cookiesTotal = 0; // sums hourly estimates for daily total
        domAppend("tr", "", "tbody", 0); //create new row
        domAppend("th", store.location, "tr", storeIndex + 1); //add store name

        for (var tableIndex = 0; tableIndex < storeHours.length; tableIndex++) {
            var cookiePurchase = store.custHourlySim(); // estimates sales for hour
            cookiesTotal += cookiePurchase; // sums total sales
            domAppend("td", cookiePurchase, "tr", storeIndex + 1); //adds results to table
            store.cookieSimArray.push(cookiePurchase); // push estimate to store array
        };

        // add total sales to bottom of store list
        domAppend("th", cookiesTotal, "tr", storeIndex + 1);
    }
};

//create store list for menu
function domAppendClass(element, text, className, index) {
    var elementName = document.createElement(element);
    elementName.innerHTML = text
    var elementPosition = document.getElementsByClassName(className)[index];
    elementPosition.appendChild(elementName);
};

for (var storeIndex = 0; storeIndex < storesArray.length; storeIndex++) {
    var storeLink = "<a href ='#'>" + storesArray[storeIndex].location + "</a>";
    domAppendClass("li", storeLink, "submenu", 0); // call function for each store
};

function evaluateForm(newStoreData) {
    var formIsValid = true;
    if (newStoreData.location.value == "") {
        newStoreData.location.setAttribute("class", "required");
        formIsValid = false;
    }
    if (newStoreData.min.value == "") {
        newStoreData.min.setAttribute("class", "required");
        formIsValid = false;
    }
    if (newStoreData.max.value == "") {
        newStoreData.max.setAttribute("class", "required");
        formIsValid = false;
    }
    if (newStoreData.avgSale.value == "") {
        newStoreData.avgSale.setAttribute("class", "required");
        formIsValid = false;
    }
    console.log(formIsValid);
    if (formIsValid) {
        storesArray.push(new CookieStore(newStoreData.location.value, newStoreData.min.value, newStoreData.max.value, newStoreData.avgSale.value));
        cookiesHourlySim(storesArray[storesArray.length - 1]);
        var storeLink = "<a href ='#'>" + storesArray[storesArray.length - 1].location + "</a>";
        domAppendClass("li", storeLink, "submenu", 0);
        document.getElementById("myForm").reset();
        storeIndex = storesArray.length
        window.scrollTo(0, 0);
        var resetClass = document.querySelectorAll('input.required');
        console.log(resetClass);
        if (resetClass.length > 0) {
            for (var i = 0; i < resetClass.length; i++) {
                console.log(i, resetClass[i]);
                resetClass[i].classList.remove("required");
            }
        }
    };
};
