const fetch = require('node-fetch');

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'dc252f7444d39f39197952cf36f30ee4';
// const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
const THE_MOVIES_DATABASE_DELAY = 0;

function checkingStatusCode(resp) {
  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }
  return resp.json();
}

function fetchUrl(url, resp) {
  fetch(url).then(checkingStatusCode).then((data) => {
    setTimeout(() => {
      resp.json(data);
    }, THE_MOVIES_DATABASE_DELAY);
  }).catch((err) => {
    console.error('The Movies Database API Error:', err.message); // eslint-disable-line no-console
  });
}

function getMovieDetails(req, resp) {
  const { id } = req.params;
  const url = new URL(`${BASE_URL}/movie/${id}`);

  const params = {
    api_key: API_KEY,
    language: 'en-US',
  };
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return fetchUrl(url, resp);
}

function getMovies(req, resp) {
  const { type, page } = req.params;
  const url = new URL(`${BASE_URL}/movie/${type}`);

  const params = {
    api_key: API_KEY,
    language: 'en-US',
    page,
  };
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return fetchUrl(url, resp);
}

module.exports = {
  getMovies,
  getMovieDetails,
};
