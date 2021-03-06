var actorId = window.location.href.split("=")[1];
var sourAmount = 0;



// var getActorId = function () {
//     var apiUrl = 'https://api.themoviedb.org/3/search/person?api_key=c930372b21a65386f628c5e6b7d65d66&language=en-US&query=' + searchQuery + '&page=1';
//     console.log(apiUrl)
//     fetch(apiUrl)
//         .then(function (response) {
//             if (response.ok) {
//                 response.json().then(function (data) {
//                     console.log(data)
//                     actorId = data.results[0].id
//                     console.log(actorId);
//                     getResults(actorId);
//                     getMoviesById(actorId);
//                     getActorMovies();
//                 })
//             }

//         })
// }

var getResults = function (search) {
    var apiUrl = "https://api.themoviedb.org/3/person/" + search + "?api_key=c930372b21a65386f628c5e6b7d65d66&language=en-US";
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    var actorImage = data.profile_path
                    document.querySelector("#bio").textContent = data.biography;
                    document.getElementById('bio').style.fontSize = "15px"
                    document.getElementById('profilepic').style.background = 'url(https://image.tmdb.org/t/p/w300' + actorImage + ')';
                    document.getElementById('profilepic').style.backgroundPosition = "center";
                    document.getElementById('profilepic').style.backgroundSize = "cover";

                })
            }

        })
}

var getMoviesById = function (id) {

    console.log(actorId)

    if (!actorId) {
        window.location.href = "./index.html";
    }

    var pageNumber = 1

    var resultListEl = document.querySelector("#resultlist");

    var apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=c930372b21a65386f628c5e6b7d65d66&language=en-US&sort_by=vote_average.asc&vote_count.gte=5&include_adult=false&page=' + pageNumber + '&with_people=' + actorId;

    console.log(apiUrl);

    fetch(apiUrl)
        .then(function (response) {
            // request successful
            if (response.ok) {

                response.json().then(function (data) {

                    console.log(data)
                    // Variable to store the count of results
                    var resultCounter = 1;
                    for (var i = 0; i < data.results.length; i++) {
                        if (data.results[i].vote_count > 0) {

                            //
                            // Increment amount of results by one
                            var resListEl = document.createElement('li');
                            resListEl.className = "okay p-2 rounded-pill fs-5 list-group-item";
                            resListEl.textContent = "???? " + data.results[i].title + ", Rating: " + data.results[i].vote_average;

                            if (data.results[i].vote_average < 5) {
                                resListEl.className = "sour p-2 rounded-pill fs-5 list-group-item";
                                resListEl.textContent = "???? " + data.results[i].title + ", Rating: " + data.results[i].vote_average + " - It's sour!";
                                sourAmount++

                                if (sourAmount > 10) {
                                    document.querySelector(".soursticker").setAttribute("style", "display: block")
                                }

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
                        var apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=c930372b21a65386f628c5e6b7d65d66&language=en-US&sort_by=vote_average.asc&include_adult=false&include_video=false&page=1&vote_count.gte=5&with_watch_monetization_types=flatrate&with_people=' + actorId;
                        // Get results from the next page
                        fetch(apiUrl)
                            .then(function (response) {
                                // request successful
                                if (response.ok) {
                                    response.json().then(function (data) {
                                        for (var i = 0; i < data.results.length; i++) {
                                            
                                            var resListEl = document.createElement('li');
                                            resListEl.className = " okay p-2 rounded-pill fs-5 list-group-item"
                                            resListEl.textContent = " ???? " + data.results[i].title + ", Rating: " + data.results[i].vote_average;

                                            if (data.results[i].vote_average < 5) {
                                                sourAmount++
                                                resListEl.className = "sour p-2 rounded-pill fs-5 list-group-item";
                                                resListEl.textContent = "???? " + data.results[i].title + ", Rating: " + data.results[i].vote_average + " - It's sour!";

                                                if (sourAmount > 10) {
                                                    document.querySelector(".soursticker").setAttribute("style", "display: block")
                                                }

                                            };

                                            resultListEl.appendChild(resListEl);

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
                    if (data.results[i].poster_path) {

                        document.getElementById(`movieflop${i}`).setAttribute("src",`https://image.tmdb.org/t/p/w92${data.results[i].poster_path}`)
                    }
                }
            })
        }
    })
}

getMoviesById();
getActorMovies();
getResults(actorId);
