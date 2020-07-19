const details = document.querySelector(".movie-details");
const reviews = document.querySelector(".reviews");
const cast = document.querySelector(".actors");

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
    if (movie.genres.length === array.length) {
      renderGenre.innerHTML += array.join(", ");
    }
  });
};

const showReviews = (data) => {
  const review = data.results;
  if (review.length > 0) {
    reviews.innerHTML = `
        <h2 class="review-title">Reviews</h2>
        <p class="review-content"></p>
    `;
  }
  const reviewContent = reviews.querySelector(".review-content");
  review.forEach((review) => {
    const myreviews = `
    <div class="review-card">
    
        <div class="by">
            Written by ${review.author}
        </div>
        <div class="review-comment">
        <input type="checkbox" id="expanded" />
        <p>${review.content}</p>
        <label for="expanded" role="button">read more</label>
        </div>
        
    </div>
    `;
    reviewContent.innerHTML += myreviews;
  });
};

const showActors = (data) => {
  const actor = data.cast;
  console.log(actor);
  cast.innerHTML = `
        <h2 class="cast-list"></h2>
    `;

  const castList = cast.querySelector("cast-list");
  actor.forEach((actor) => {
    const actorDets = `
    <div class="review-card">
        <div class="by">Written by ${actor.character}</div>
    </div>
    `;
    castList.innerHTML += actorDets;
  });
};

addEventListener("DOMContentLoaded", (e) => {
  const search = new URLSearchParams(window.location.search);

  const id = search.get("id");
  const type = search.get("type");

  if ((id, type === "tv")) {
    getTvDets(id)
      .then((data) => renderDetails(data))
      .catch((err) => console.log(err));
    getTvReviews(id)
      .then((data) => showReviews(data))
      .catch((err) => console.log(err));
    getTvCredits(id)
      .then((data) => showActors(data))
      .catch((err) => console.log(err));
  } else {
    getMovieDets(id)
      .then((data) => renderDetails(data))
      .catch((err) => console.log(err));
    getMovieReviews(id)
      .then((data) => showReviews(data))
      .catch((err) => console.log(err));
    getMovieCredits(id)
      .then((data) => showActors(data))
      .catch((err) => console.log(err));
  }
});
