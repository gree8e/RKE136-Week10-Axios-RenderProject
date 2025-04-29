const express = require('express');
const axios = require('axios');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  let url = 'https://api.themoviedb.org/3/movie/157336?api_key=4ca94f8b470d7e34bd3f59c3914295c8';
  axios.get(url)
  .then(response => {
    let data = response.data
    let releaseDate = new Date(data.release_date).getFullYear();

    let genresToDisplay = '';
    data.genres.forEach(genre => {
      genresToDisplay = genresToDisplay + `${genre.name}, `
  });

  let genresUpdated = genresToDisplay.slice(0, -2) + '.';
  let posterUrl = `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${data.poster_path}`;



    let currentYear = new Date ().getFullYear();

    res.render('index', {
      dataToRender: data,
      year: currentYear,
      releaseYear: releaseDate,
      genres: genresUpdated,
      poster: posterUrl
    });
  });

});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running.');
});