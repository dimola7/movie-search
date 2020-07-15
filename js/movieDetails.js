const details = document.querySelector(".movie-details");

//api doc instructs to add this url before every image url
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const renderDetails = (data) => {
  const movie = data;
  const year = movie.release_date;
  const tvYear = movie.first_air_date;
  console.log(movie);
  details.innerHTML = `
    <div class="grid">
        <div class="image">
          <h2><span>|</span>${movie.title || movie.name}</h2>
         <img
            class="movie horizontal"
            src="${IMG_URL}${movie.backdrop_path || movie.poster_path}"
            alt="image"
            data-movie-id=${movie.id}
          />
        </div>
        <div class="dets">
          <h1>Storyline</h1>
          <p class="overview">${movie.overview}</p>
          <p class="rating"><span class="fa fa-star star"></span> ${
            movie.vote_average
          }</p>
          <p class="genres">Genres: </p>
          <p class="year">Runtime: ${
            movie.episode_run_time || movie.runtime
          } min</p>
          <p class="year">Released: ${year || tvYear}</p>
        </div>
      </div> 
    `;
  let array = [];
  const renderGenre = details.querySelector(".genres");
  movie.genres.forEach((genre) => {
    array.push(genre.name);
    console.log(array);
    if (movie.genres.length === array.length) {
      renderGenre.innerHTML += array.join(", ");
    }
  });
};

addEventListener("DOMContentLoaded", (e) => {
  const search = new URLSearchParams(window.location.search);

  const id = search.get("id");
  const type = search.get("type");

  if (id) {
    getMovieReviews(id)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    getTvReviews(id)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
  //   if ((id, type === "movie")) {
  //     getMovieDets(id)
  //       .then((data) => renderDetails(data))
  //       .catch((err) => console.log(err));
  //   } else {
  //     getTvDets(id)
  //       .then((data) => renderDetails(data))
  //       .catch((err) => console.log(err));
  //   }
  if ((id, type === "tv")) {
    getTvDets(id)
      .then((data) => renderDetails(data))
      .catch((err) => console.log(err));
  } else {
    getMovieDets(id)
      .then((data) => renderDetails(data))
      .catch((err) => console.log(err));
  }
});
