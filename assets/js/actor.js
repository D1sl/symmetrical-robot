var searchQuery = window.location.href.split("=")[1];
var actorId
var movieId
var resultListEl = document.querySelector("#resultlist");


var getActorId = function () {
    var apiUrl = 'https://api.themoviedb.org/3/search/person?api_key=c930372b21a65386f628c5e6b7d65d66&language=en-US&query=' + searchQuery + '&page=1';
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    actorId = data.results[0].id
                    getResults(actorId);
                    getMoviesById(actorId);
                    getActorMovies();
                    
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

    

    var apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=c930372b21a65386f628c5e6b7d65d66&language=en-US&sort_by=vote_average.asc&include_adult=false&page=' + pageNumber + '&with_people=' + id;



    fetch(apiUrl)
        .then(function (response) {
            // request successful
            if (response.ok) {
                
                response.json().then(function (data) {
                       
                    // Variable to store the count of results
                    var resultCounter = 1;
                    for (var i = 0; i < data.results.length; i++) {
                        if (data.results[i].vote_count > 0) {
                        var movieId = data.results[i].id
                            
                            // Increment amount of results by one
                            var resListEl = document.createElement('li');
                            resListEl.textContent = "✔️ " + data.results[i].title + ", Rating: " + data.results[i].vote_average;

                            if (data.results[i].vote_average < 5) {
                                resListEl.className = "sour";
                                resListEl.textContent = "🤮 " + data.results[i].title + ", Rating: " + data.results[i].vote_average + " - It's sour!";

                            };
                        
                            resultListEl.appendChild(resListEl);
                            // getStreamOption(data.results[i].id, data.results[i].title);
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
                    document.getElementById(`movieflop${i}`).setAttribute("src",`https://image.tmdb.org/t/p/w92${data.results[i].poster_path}`)
                }
            })
        }
    })
  
}

// Each time a new movie is pushed to the page, take that ID and pass it to the getStreamOption -function together with the movie name


// Also check LINE 74 that the call for this function is not commented out


// Search for streaming services
// var getStreamOption = function(movieId, title) {
//     var apiUrl = "https://api.themoviedb.org/3/movie/" + movieId + "/watch/providers?api_key=c930372b21a65386f628c5e6b7d65d66";
//     fetch(apiUrl)
//     .then(function(response){
//       if(response.ok) {
//             response.json().then(function(data){                
//                 for (var i = 0; i < data.results.US.flatrate.length; i++) {
//                 console.log(data.results.US.flatrate[i].provider_name);
//                 console.log(title);
//             }
//             })
//         }
//    })
// }

getActorId();