
var resultListEl = document.querySelector("#resultlist");
var searchButton = document.querySelector("#run-search");
var searchInputEl = document.querySelector("#search");
var actorNameEl = document.querySelector("#actorname");
var actorProfileEl = document.querySelector("#actorimg");
var actorDescriptionEl = document.querySelector("#description")

var pageNumber = 1;
var actorSearchTerm = ""
var actorProfile;

var apiUrl = 'https://api.themoviedb.org/3/search/person?api_key=c930372b21a65386f628c5e6b7d65d66&language=en-US&query=' + actorSearchTerm + '&page=1';

var actorId

// hide profile image
document.getElementById("profilepic").style.display='none';



// form submit handler
var formSubmitHandler = function (event) {
    event.preventDefault();

    // Reset page number each time
    pageNumber = 1;

    // get value from input
    var searchTerm = searchInputEl.value.trim();

    if (searchTerm) {
        getActorId(searchTerm);
        getActorInfo(searchTerm)
    } else {
        alert("Please enter a search term");
    }
}


// get results for the search term
var getActorId = function (searchTerm) {
    // format the API url
    var apiUrl = 'https://api.themoviedb.org/3/search/person?api_key=c930372b21a65386f628c5e6b7d65d66&language=en-US&query=' + searchTerm + '&page=1';
    // make request to the url
    fetch(apiUrl)
        .then(function (response) {
            // request successful
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    var actorId = data.results[0].id;
                    var actorProfile = data.results[0].profile_path;
                    console.log(data.results[0].name);
                    console.log(actorProfile);


                    // Show profile pic
                    document.getElementById("profilepic").style.display='block';
                    // Update its source
                    document.getElementById("profilepic").src = "https://image.tmdb.org/t/p/w200" + actorProfile;




                    actorNameEl.textContent = data.results[0].name;

                    getMoviesById(actorId);
                });
            };
        });
};

var getMoviesById = function (id) {
    var apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=c930372b21a65386f628c5e6b7d65d66&language=en-US&sort_by=vote_average.asc&include_adult=false&page=' + pageNumber + '&with_people=' + id;
    console.log(apiUrl);

    // Clear previous results if any
    resultListEl.textContent = "";
 

    fetch(apiUrl)
        .then(function (response) {
            // request successful
            if (response.ok) {
                response.json().then(function (data) {

                    // Variable to store the count of results
                    var resultCounter = 0;
                    for (var i = 0; i < data.results.length; i++) {
                        if (data.results[i].vote_count > 0) {
                            // Increment amount of results by one
                            var resListEl = document.createElement('li');
                            resListEl.textContent = "✔️ " + data.results[i].title + ", Rating: " + data.results[i].vote_average;
                            if (data.results[i].vote_average < 5) {
                                resListEl.className = "sour";
                                resListEl.textContent = "🤮 " + data.results[i].title + ", Rating: " + data.results[i].vote_average + " - It's sour!";
                            };

                            resultListEl.appendChild(resListEl);
                            resultCounter++
                        };
                    };

                    // If there are less than five results, run this
                    // while (resultCounter < 5) {
                    if (resultCounter < 5) {

                        // Increase page number by one to get the next set of results
                        pageNumber++

                        // Reset apiUrl for new parameters
                        var apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=c930372b21a65386f628c5e6b7d65d66&language=en-US&sort_by=vote_average.asc&include_adult=false&page=' + pageNumber + '&with_people=' + id;

                        // Get results from the next page
                        fetch(apiUrl)
                            .then(function (response) {
                                // request successful
                                if (response.ok) {
                                    response.json().then(function (data) {
                                        for (var i = 0; i < data.results.length; i++) {

                                            var resListEl = document.createElement('li');
                                            resListEl.textContent = "✔️ " + data.results[i].title + ", Rating: " + data.results[i].vote_average;

                                            if (data.results[i].vote_average < 5) {
                                                resListEl.className = "sour";
                                                resListEl.textContent = "🤮 " + data.results[i].title + ", Rating: " + data.results[i].vote_average + " - It's sour!";

                                            };

                                            resultListEl.appendChild(resListEl);

                                            console.log(data.results[i].title);
                                            resultCounter++
                                        };
                                    });
                                };
                            });
                    };
                });
            };
        });
};


searchButton.addEventListener('click', formSubmitHandler);


var getActorInfo = function(searchTerm) {
    var apiUri = "https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&exsentences=10&exlimit=1&titles=" + searchTerm + "&explaintext=1&format=json";

    fetch(apiUri)
    .then(function (response) {
        // request successful
        if (response.ok) {
            response.json().then(function (data){
                console.log(data);
                
            })
        }
    })
};

var getActorById = function(pageId) {
    var apiUrl = "https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&pageids=" + pageId;

    fetch(apiUrl)
    .then(function (response) {
        // request successful
        if (response.ok) {
            response.json().then(function (data){
                console.log(data);
                
            })
        }
    })
}
