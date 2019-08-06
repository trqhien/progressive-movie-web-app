const express = require('express');
const { redirectToHTTPS } = require('express-http-to-https');
const { getMovieDetails, getMovies, fetchImage } = require('./fetch');

function startServer() {

    const app = express();

    // Redirect HTTP to HTTPS,
    app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

    app.use(express.static('public'))

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
    app.get('/image/:width/:name', fetchImage);

    app.get('/movie-detail/:id', function(req,res){
        const id = req.params.id;
        res.redirect(`/movie-detail.html?id=${id}`);
    }); 

    // Handle requests for static files
    

    return app.listen('8002', () => {
        // eslint-disable-next-line no-console
        console.log('Local DevServer Started on port 8002...');
    });

}

startServer();
