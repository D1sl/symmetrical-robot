var searchInputEl = document.querySelector("#search");
var searchButton = document.querySelector("#run-search");

var sendSearch = function (event) {
    // Prevent page from reloading which is the browser default action on form submit
    event.preventDefault();

    // Take the value of the search textbox, trim away any spaces and assign it into a variable
    var searchQuery = searchInputEl.value.trim();

    // Take the searchQuery variable and use it to redirect the user to the next page, adding the variable to the end of the URL 
    location.href = './actor.html?=' + searchQuery;
};

// When form is submitted, run sendSearch
searchButton.addEventListener('click', sendSearch);