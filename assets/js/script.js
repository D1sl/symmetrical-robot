var searchInputEl = document.querySelector("#search");
var searchButton = document.querySelector("#run-search");
var genreListEl = document.querySelector("#genre");
var worstItemEl = document.querySelector(".item");





var sendSearch = function (event) {
    // Prevent page from reloading which is the browser default action on form submit
    event.preventDefault();

    // Take the value of the search textbox, trim away any spaces and assign it into a variable
    var searchQuery = searchInputEl.value.trim();

    // Take the searchQuery variable and use it to redirect the user to the next page, adding the variable to the end of the URL 
    location.href = './actor.html?=' + searchQuery;
};

var getMoviesByGenre = function (event) {
    var genre = genreListEl.value;

    var apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=c930372b21a65386f628c5e6b7d65d66&language=en-US&sort_by=vote_average.asc&include_adult=false&include_video=false&page=1&primary_release_year=2021&vote_count.gte=30&with_genres=' + genre + '&with_watch_monetization_types=flatrate';

    console.log(genre);
    console.log(apiUrl);

    fetch(apiUrl)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            console.log(data);
            

            document.querySelector("#actionflopheader").textContent = data.results[0].title;
            document.querySelector("#worstimage").setAttribute('src', 'https://image.tmdb.org/t/p/w154' + data.results[0].poster_path);

        })

        worstItemEl.setAttribute('style', "display: flex");
};

// When an option on the list is selected
genreListEl.addEventListener('change', getMoviesByGenre);

// When form is submitted, run sendSearch
searchButton.addEventListener('click', sendSearch);