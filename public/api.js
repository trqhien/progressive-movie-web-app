function getMovieById(id) {
  return fetch(`/movie/${id}`);
}

function asJSON(response) {
  return response.json();
}

function convertToRuntimeFormat(durationInMinutes) {
  if (typeof durationInMinutes !== 'number') {
    return '';
  }

  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  let output = '';

  if (hours >= 1) {
    output += `${hours}h`;
  }
  output += `${minutes}m`;
  return output;
}


function formatCurrency(number) {
  let num = number;

  if (typeof number !== 'number') {
    num = 0;
  }

  const currencyFormatter = new Intl.NumberFormat(
    'en-US',
    {
      style: 'decimal',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    },
  );

  return currencyFormatter.format(num);
}

function updateUI(movie) {
  const title = document.getElementById('title-label');
  const releaseDate = new Date(movie.release_date);
  title.innerHTML = `${movie.title} (${releaseDate.getFullYear()})`;

  const overview = document.getElementById('overview-label');
  overview.innerHTML = movie.overview;

  const runtime = document.getElementById('runtime-label');
  runtime.innerHTML = `${convertToRuntimeFormat(movie.runtime)}`;

  const budget = document.getElementById('budget-label');
  budget.innerHTML = `$${formatCurrency(movie.budget)}`;

  const revenue = document.getElementById('revenue-label');
  revenue.innerHTML = `$${formatCurrency(movie.revenue)}`;

  const spokenLanguages = document.getElementById('spoken-languages-label');
  spokenLanguages.innerHTML = movie.spoken_languages
    .map(language => language.name)
    .join(', ');

  const genresInfo = document.getElementById('genres-label-info');
  genresInfo.innerHTML = movie.genres
    .map(genre => genre.name)
    .join(', ');

  const genresRelease = document.getElementById('genres-label-release');
  genresRelease.innerHTML = movie.genres
    .map(genre => genre.name)
    .join(', ');

  const picture = document.getElementById('poster-image');
  let outputHTML = '';
  outputHTML += `<source media="(min-width: 500px)" srcset="image/w185${movie.poster_path} 1x, image/w500${movie.poster_path} 2x, image/w780${movie.poster_path} 3x, image/original${movie.poster_path}"></source>`; // eslint-disable-line max-len
  outputHTML += `<source media="(min-width: 400px)" srcset="image/w780${movie.backdrop_path} 1x, image/w1280${movie.backdrop_path} 2x, image/w1280${movie.backdrop_path} 3x, image/original${movie.backdrop_path}"></source>`; // eslint-disable-line max-len
  outputHTML += `<source media="(min-width: 300px)" srcset="image/w300${movie.backdrop_path} 1x, image/w780${movie.backdrop_path} 2x, image/w1280${movie.backdrop_path} 3x, image/original${movie.backdrop_path}"></source>`; // eslint-disable-line max-len
  // Will add more media query later when actually working on the reponsive part.
  // Right now it simply just load the poster when the screen width is above 500px.
  outputHTML += `<img src="image/w300${movie.backdrop_path}"></img>`;
  picture.innerHTML = outputHTML;
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  } 
  alert('Query Variable ' + variable + ' not found');
}

const movieId = getQueryVariable("id");
const response = getMovieById(movieId);

response
  .then(asJSON)
  .then(updateUI)
  .catch(err => {
    console.log(err); // eslint-disable-line no-console
  });
