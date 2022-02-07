var searchInputEl = document.querySelector("#search");
var searchButton = document.querySelector("#run-search");
var genreListEl = document.querySelector("#genre");
var worstItemEl = document.querySelector(".item");
var searchResultListEl = document.querySelector(".actorsearchresults");





var sendSearch = function (event) {
    // Prevent page from reloading which is the browser default action on form submit
    event.preventDefault();

    // In case user closes the modal and tries again, reset the content
    searchResultListEl.textContent = "";

    // Take the value of the search textbox, trim away any spaces and assign it into a variable
    var searchQuery = searchInputEl.value.trim();

    var apiUrl = 'https://api.themoviedb.org/3/search/person?api_key=c930372b21a65386f628c5e6b7d65d66&language=en-US&query=' + searchQuery + '&page=1';

    // Take the searchQuery variable and use it to redirect the user to the next page, adding the variable to the end of the URL 
    // location.href = './actor.html?=' + searchQuery;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);

                    // If more than 1 result, show list of results, otherwise take user to the next page
                    if (data.results.length > 1) {

                        // Update Modal Content
                        for (var i = 0; i < data.results.length; i++) {
                            // Build list item
                            var resultItemEl = document.createElement("a");
                            resultItemEl.classList.add("list-group-item", "list-group-item-action", "flex-column", "align-items-start");
                            
                            var resultListItemEl = document.createElement("div");
                            resultListItemEl.classList.add("d-flex", "w-11", "justify-content-start", "align-items-center");
                            resultItemEl.appendChild(resultListItemEl);


                            // resultItemEl.innerHTML = "<div id='resultitem' class='d-flex w-100 justify-content-between align-items-center'>";

                            var resultImageEl = document.createElement("img");
                            resultImageEl.setAttribute("src", "https://image.tmdb.org/t/p/w185" + data.results[i].profile_path);
                            resultImageEl.setAttribute("style", "width: 70px; height: 70px; object-fit: cover; border-radius: 5px; margin-right: 15px; object-position: 100% 20%; display: block");
                            resultListItemEl.appendChild(resultImageEl);


                            resultItemEl.setAttribute("href", './actor.html?=' + data.results[i].id)
                            searchResultListEl.appendChild(resultItemEl);

                            var resultTextContentEl = document.createElement("p");
                            resultTextContentEl.classList.add("mb-1", "searchresults");

                            var appearsIn = [];

                            for (var x = 0; x < data.results[i].known_for.length; x++) {
                                // Movies have titles, TV shows have names. Use IF loop to ensure we capture both.
                                if (data.results[i].known_for[x].title) {
                                    appearsIn.push(data.results[i].known_for[x].title);
                                } else {
                                    appearsIn.push(data.results[i].known_for[x].name);
                                }
                            }

                            resultTextContentEl.innerHTML = "<span class='searchactorname0'>" + data.results[i].name + "</span><br> <span class='actappearsin'>" + appearsIn.join(", ") + " " + "</span>";
                            console.log(appearsIn);

                            resultListItemEl.appendChild(resultTextContentEl);

                            var resultName = data.results[i].name
                        }

                        // Calls the modal after content is created
                        $('#exampleModal').modal();

                    // If one result, go directly to actorpage
                    } else if (data.total_results === 1) {
                        location.href = './actor.html?=' + data.results[0].id
                    // If no results, display error
                    } else if (data.total_results === 0) {
                        var noResultsBoxEl = document.createElement("div");
                        noResultsBoxEl.classList.add("d-flex", "justify-content-center");
                        searchResultListEl.appendChild(noResultsBoxEl)

                        var noResultsGifEl = document.createElement("img");
                        noResultsGifEl.setAttribute("src", "./assets/images/noresults.gif");
                        noResultsGifEl.className = "confusion";
                        noResultsBoxEl.appendChild(noResultsGifEl);

                        var noResultsTextboxEl = document.createElement("div");
                        noResultsTextboxEl.setAttribute("style", "padding-top: 20px; padding-left: 30px")
                        noResultsBoxEl.appendChild(noResultsTextboxEl);

                        var noResultsHeadingEl = document.createElement("h3");
                        noResultsHeadingEl.setAttribute("style", "color: black");
                        noResultsHeadingEl.textContent = "Where is everyone?";
                        var noResultsText = document.createElement("div");
                        noResultsText.setAttribute("style", "color: black; padding-top: 15px");
                        noResultsText.innerHTML = "<p>Your search for <b>" + searchQuery + "</b> didn't return any results. <br>We are just as perplexed as Vincent!</p> <p style='color:grey; font-size: 14px'><i>Vincent from Pulp Fiction, portrayed by <a style='color: grey; text-decoration: underline' href='./actor.html?=8891'>John Travolta</a></i></p>";
                        noResultsTextboxEl.appendChild(noResultsHeadingEl);
                        noResultsTextboxEl.appendChild(noResultsText);


                        $('#exampleModal').modal();
                    };
                });
            };
        });
};

var getMoviesByGenre = function (event) {
    var genre = genreListEl.value;

    var apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=c930372b21a65386f628c5e6b7d65d66&language=en-US&sort_by=vote_average.asc&include_adult=false&include_video=false&page=1&primary_release_year=2021&vote_count.gte=10&with_genres=' + genre + '&with_watch_monetization_types=flatrate&with_original_language=en';

    console.log(genre);
    console.log(apiUrl);

    fetch(apiUrl)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            console.log(data);

            var movieId = data.results[0].id

            var apiUrl = 'https://api.themoviedb.org/3/movie/' + movieId + '/reviews?api_key=c930372b21a65386f628c5e6b7d65d66&language=en-US&page=1'
            console.log(apiUrl);

            fetch(apiUrl).then(function (res) {
                return res.json()
            })
                .then(function (data) {
                    console.log(data);
                    if (data.results.length > 0) {
                        document.querySelector(".review").textContent = data.results[0].content;
                    } else {
                        document.querySelector(".review").textContent = "";
                    }
                })


            document.querySelector(".shapes").setAttribute('style', 'display: none');
            document.querySelector("#flopheader").textContent = data.results[0].title;
            document.querySelector("#worstimage").setAttribute('src', 'https://image.tmdb.org/t/p/w154' + data.results[0].poster_path);
            document.querySelector("#floprating").textContent = data.results[0].vote_average;

        })

    worstItemEl.setAttribute('style', "display: flex");
};

var getQuote = function () {
    var apiUrl = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=&api-key=jMwUb9k2ba7NgHXwScLeG5BBRWgggomO";

    fetch(apiUrl)
    .then(function (res) {
        return res.json()
    })
    .then(function (data) {
        document.querySelector(".quote").textContent = data.results[0].summary_short;
        document.querySelector(".revtitle").textContent = data.results[0].display_title;

        console.log(data)
        document.querySelector(".revlink").innerHTML = "<a href='" + data.results[0].link.url + "' class='revlinktext'>" + data.results[0].link.suggested_link_text + "</a>";


    })

}


getQuote();

// When an option on the list is selected
genreListEl.addEventListener('change', getMoviesByGenre);

// When form is submitted, run sendSearch
searchButton.addEventListener('click', sendSearch);