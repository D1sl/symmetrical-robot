var searchQuery = window.location.href.split("=")[1];
console.log(searchQuery);
var actorId



var getActorId = function () {
    var apiUrl = 'https://api.themoviedb.org/3/search/person?api_key=c930372b21a65386f628c5e6b7d65d66&language=en-US&query=' + searchQuery + '&page=1';
    console.log(apiUrl)
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data)
                    actorId = data.results[0].id
                    console.log(actorId);
                    getResults(actorId);
                    getMoviesById(actorId);

                })
            }

        })
}

var getResults = function (search) {
    var apiUrl = "https://api.themoviedb.org/3/person/" + search + "?api_key=c930372b21a65386f628c5e6b7d65d66&language=en-US";
    //console.log(apiUrl)
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data)
                    var actorImage = data.profile_path
                    document.querySelector("#bio").textContent = data.biography;
                    document.getElementById('profilepic').style.background = 'url(https://image.tmdb.org/t/p/w300' + actorImage + ')';
                    document.getElementById('profilepic').style.backgroundPosition = "center";
                })
            }

        })
}

var getMoviesById = function (id) {

    var pageNumber = 1

    var resultListEl = document.querySelector("#resultlist");

    var apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=c930372b21a65386f628c5e6b7d65d66&language=en-US&sort_by=vote_average.asc&include_adult=false&page=' + pageNumber + '&with_people=' + id;
    console.log(apiUrl);



    fetch(apiUrl)
        .then(function (response) {
            // request successful
            if (response.ok) {

                response.json().then(function (data) {

                    // Variable to store the count of results
                    var resultCounter = 1;
                    for (var i = 0; i < data.results.length; i++) {
                        if (data.results[i].vote_count > 0) {

                            //
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
var getActorMovies = function () {
    var apiUrl = "https://api.themoviedb.org/3/discover/movie?api_key=c930372b21a65386f628c5e6b7d65d66&vote_count.gte=1&language=en-US&sort_by=vote_average.asc&include_adult=false&page=1&with_people=" + actorId;

    fetch(apiUrl) 
    .then(function (response){
        if(response.ok) {
            response.json().then(function (data) {
                for(var i=0; i < 6; i++) {
                    console.log(data)
                    document.getElementById(`movieflop${i}`).setAttribute("src",`https://image.tmdb.org/t/p/w92${data.results[i].poster_path}`)
                }
            })
        }
    })
}
getActorMovies();
getActorId();

