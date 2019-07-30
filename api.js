
// Will use environment to hide those information
const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = 'dc252f7444d39f39197952cf36f30ee4'

function movieDetail(id) {
  const url = new URL(`${BASE_URL}/movie/${id}`)

  const params = {
    api_key: API_KEY,
    language: 'en-US'
  }

  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

  fetch(url)
    .then(asJSON)
    .then(updateUI)
    .catch((err) => {
      console.log(err);
    });
}

function log(result) {
  console.log(result);
}

function asJSON(response) {
  return response.json();
}

function updateUI(movie) {
  const title = document.getElementById('movie-detail-title-label');
  const releaseDate = new Date(movie.release_date);
  title.innerHTML = `${movie.title} (${releaseDate.getFullYear()})`;

  const overview = document.getElementById('movie-detail-overview-label');
  overview.innerHTML = movie.overview;

  const runtime = document.getElementById('movie-detail-runtime-label');
  runtime.innerHTML = movie.runtime;

  const budget = document.getElementById('movie-detail-budget-label');
  budget.innerHTML = movie.budget;

  const revenue = document.getElementById('movie-detail-revenue-label');
  revenue.innerHTML = movie.revenue;

  const spokenLanguages = document.getElementById('movie-detail-spoken-languages-label');
  spokenLanguages.innerHTML = movie.spoken_languages
    .map(language => language.name)
    .join(', ');

  const genres = document.getElementById('movie-detail-genres-label');
  genres.innerHTML = movie.genres
    .map(genre => genre.name)
    .join(', ');
}

movieDetail('420818'); // For testing, will remove later
