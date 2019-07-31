function movieDetail(id) {
  fetch(`/movie/${id}`)
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
}

movieDetail('420818'); // For testing, will remove later
