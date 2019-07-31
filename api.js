
// Will use environment to hide those information
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
const API_KEY = 'dc252f7444d39f39197952cf36f30ee4';

function getMovieById(id) {
  const url = new URL(`${BASE_URL}/movie/${id}`);

  const params = {
    api_key: API_KEY,
    language: 'en-US',
  };

  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  return fetch(url);
}

function asJSON(response) {
  return response.json();
}

function updateUI(movie) {
  const title = document.getElementById('title-label');
  const releaseDate = new Date(movie.release_date);
  title.innerHTML = `${movie.title} (${releaseDate.getFullYear()})`;

  const overview = document.getElementById('overview-label');
  overview.innerHTML = movie.overview;

  const runtime = document.getElementById('runtime-label');
  runtime.innerHTML = movie.runtime;

  const budget = document.getElementById('budget-label');
  budget.innerHTML = movie.budget;

  const revenue = document.getElementById('revenue-label');
  revenue.innerHTML = movie.revenue;

  const spokenLanguages = document.getElementById('spoken-languages-label');
  spokenLanguages.innerHTML = movie.spoken_languages
    .map(language => language.name)
    .join(', ');

  const genres = document.getElementById('genres-label');
  genres.innerHTML = movie.genres
    .map(genre => genre.name)
    .join(', ');

  const picture = document.getElementById('poster-image');
  let outputHTML = '';
  outputHTML += `<source media="(min-width: 500px)" srcset="${IMAGE_BASE_URL}/w185${movie.poster_path} 1x, ${IMAGE_BASE_URL}/w500${movie.poster_path} 2x, ${IMAGE_BASE_URL}/w780${movie.poster_path} 3x, ${IMAGE_BASE_URL}/original${movie.poster_path}"></source>`; // eslint-disable-line max-len
  outputHTML += `<source media="(min-width: 400px)" srcset="${IMAGE_BASE_URL}/w780${movie.backdrop_path} 1x, ${IMAGE_BASE_URL}/w1280${movie.backdrop_path} 2x, ${IMAGE_BASE_URL}/w1280${movie.backdrop_path} 3x, ${IMAGE_BASE_URL}/original${movie.backdrop_path}"></source>`; // eslint-disable-line max-len
  outputHTML += `<source media="(min-width: 300px)" srcset="${IMAGE_BASE_URL}/w300${movie.backdrop_path} 1x, ${IMAGE_BASE_URL}/w780${movie.backdrop_path} 2x, ${IMAGE_BASE_URL}/w1280${movie.backdrop_path} 3x, ${IMAGE_BASE_URL}/original${movie.backdrop_path}"></source>`; // eslint-disable-line max-len
  // Will add more media query later when actually working on the reponsive part.
  // Right now it simply just load the poster when the screen width is above 500px.
  outputHTML += `<img src="${IMAGE_BASE_URL}/w300${movie.backdrop_path}"></img>`;
  picture.innerHTML = outputHTML;
}

// For testing, will remove later
const response = getMovieById('420818');

response
  .then(asJSON)
  .then(updateUI)
  .catch((err) => {
    console.log(err); // eslint-disable-line no-console
  });
