const express = require('express');
const fetch = require('node-fetch');
const { redirectToHTTPS } = require('express-http-to-https');

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'dc252f7444d39f39197952cf36f30ee4';

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

function startServer() {
  const app = express();

  // Redirect HTTP to HTTPS,
  app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

  app.use(express.static('public'));

  // Logging for each request
  app.use((req, resp, next) => {
    const now = new Date();
    const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
    const path = `"${req.method} ${req.path}"`;
    const m = `${req.ip} - ${time} - ${path}`;
    // eslint-disable-next-line no-console
    console.log(m);
    next();
  });

  // Handle requests for the data
  app.get('/movie/:id', getMovieDetails);
  app.get('/movie/:type/:page', getMovies);

  // Handle requests for static files
  app.use(express.static('public'));

  return app.listen('8002', () => {
    // eslint-disable-next-line no-console
    console.log('Local DevServer Started on port 8002...');
  });
}

startServer();
