var api_key = "fce9002a14d2a9df6121f300d03601c7";
var api_movie = "https://api.themoviedb.org/3/movie/top_rated?api_key=";
var api_movie_now = "https://api.themoviedb.org/3/movie/top_rated?api_key=";
var api_movie_up = "https://api.themoviedb.org/3/movie/top_rated?api_key=";
var api_movie_pop = "https://api.themoviedb.org/3/movie/top_rated?api_key=";

var ApiTypeUrl= {
    "top": api_movie,
    "now": api_movie_now,
    "pop": api_movie_pop,
    "up": api_movie_up
    }

function fetchMovieDetails(id){

}

function status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
}

function json(response) {
    return response.json()
}

function fetchMoviesList(page, language, type = "top"){

    let api = ApiTypeUrl[type];
    if(!api){
        api = api_movie; // by default
    }

    return fetch(api + api_key + "&language=" + language + "&page=" + page)
        .then(status)
        .then(json)
        .then(function(data){
            var movieData = [];

            let results = data.results;
            for(let jsonObj of results){
                let movie = new Movie(jsonObj.id, jsonObj.backdrop_path, 
                    jsonObj.original_language, jsonObj.original_title, 
                    jsonObj.overview, jsonObj.poster_path, 
                    jsonObj.release_date, 
                    jsonObj.vote_average);

                movieData.push(movie);
            }
                
            return Promise.resolve(movieData);
        }).catch(function(error){
            return Promise.reject(new NetworkError(error.message));
        });
}

class Movie {
    static IMAGE_URL = "https://image.tmdb.org/t/p";
    constructor(id, backdrop_path, original_language, original_title
                , overview, poster_path, release_date, vote_average){
                    this.id = id;
                    this.backdrop_path = backdrop_path;
                    this.original_language = original_language;
                    this.original_title = original_title;
                    this.overview = overview;
                    this.poster_path = poster_path;
                    this.release_date = release_date;
                    this.vote_average = vote_average;
                }

    backDrop(){
        return Movie.IMAGE_URL + "/original" + this.backdrop_path;
    }

    poster(){
        return "https://image.tmdb.org/t/p/w500/" + this.poster_path;
    }

    smallPoster(){
        return "https://image.tmdb.org/t/p/w185/" + this.poster_path;
    }

    largePoster(){
        return "https://image.tmdb.org/t/p/original/" + this.poster_path;
    }

    releaseDate(){
        return this.release_date;
    }

    votes(){
        return this.vote_average;
    }
}