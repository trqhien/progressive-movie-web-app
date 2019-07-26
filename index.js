// import  from 'dotenv';

require('dotenv').config();

function latestNews() {
  console.log(process.BASE_URL);
  console.log(process.API_KEY);

  // const url = new URL(`${process.BASE_URL}/movies/now_playing`)

  // const params = {
  //   api_key: process.API_KEY,
  //   language: 'en-US'
  // }

  // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

  // let request = fetch(`${process.BASE_URL}/movie/now_playing?language=en-US&page=1&api_key=${process.API_KEY}`)
  fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=dc252f7444d39f39197952cf36f30ee4')
    .then(validateResponse);
}

function validateResponse(response) {
  console.log(response.json().then(data => {
    console.log(data)
  }))
}

latestNews();
