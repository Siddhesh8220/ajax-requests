const axios = require("axios");

let actors = {};
let genres = {};

async function findData(movie) {
  movie["genres"].forEach((genre) => {
    genres[genre] = genres[genre] ? [...genres[genre], movie.title] : [];
  });

  movie["cast"].forEach((actor) => {
    actors[actor] = actors[actor] ? [...actors[actor], movie.title] : [];
  });
}

async function getSpecificData(data) {
  data.forEach(findData);

  const actorsData = Object.keys(actors).map((actor) => {
    return { Name: actor, Movies: actors[actor] };
  });

  const genresData = Object.keys(genres).map((genre) => {
    return { Name: genre, Movies: genres[genre] };
  });

  return {
    Actors: actorsData,
    Genres: genresData,
  };
}

async function getData() {
  let res = await axios.get(
    `https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json`,
    {
      "Content-Type": "application/json",
    }
  );
  const data = res.data;
  newData = await getSpecificData(data);
  console.info(JSON.stringify(newData));
}

getData();
