const search = document.querySelector("form");
const showMovies = document.querySelector(".movies");
const loader = document.querySelector(".loader");
const title = document.querySelector(".movie-title");
const upcoming = document.querySelector(".upcoming");
const shows = document.querySelector(".shows");
const topRated = document.querySelector(".top-rated");
// const actors = document.querySelector(".actors");

//api doc instructs to add this url before every image url
const IMG_URL = "https://image.tmdb.org/t/p/w500";

//display searched movie results
const updateUI = (data) => {
  const movies = data.movies.results;
  console.log(movies);
  title.innerHTML = `<h1>Results</h1>`;
  movies.forEach((movie) => {
    const type = movie.media_type;
    const id = movie.id;
    if (movie.poster_path) {
      const html = `
      <a href="movieDetails.html?type=${type}&id=${id}">
     <div class="movie-card">
          <img
            class="movie-card-img"
            src="${IMG_URL}${movie.poster_path}"
            alt="image"
            data-movie-id=${movie.id}
          />
        <p class="movie-name">${movie.title || movie.name}</p>
      </div>
      </a>
        `;
      showMovies.innerHTML += html;
    }
  });
};
//display topRated movies
const topRatedMovies = (data) => {
  const movies = data.topRated.results.reverse();
  console.log(movies);
  movies.forEach((movie) => {
    const type = movie.media_type;
    const id = movie.id;
    const html = `
    <a href="movieDetails.html?type=movie&id=${id}">
        <div class="movie-card">
          <img
            class="movie-card-img"
            src="${IMG_URL}${movie.poster_path}"
            alt="image"
            data-movie-id=${movie.id}
          />
        <p class="movie-name">${movie.title}</p>
      </div>
      </a>
    `;
    topRated.innerHTML += html;
  });
};
//display upcoming movies
const upcomingMovies = (data) => {
  const movies = data.upcoming.results;
  movies.forEach((movie) => {
    const type = movie.media_type;
    const id = movie.id;
    const html = `
    <a href="movieDetails.html?type=movie&id=${id}">
        <div class="movie-card">
          <img
            class="movie-card-img"
            src="${IMG_URL}${movie.poster_path}"
            alt="image"
            data-movie-id=${movie.id}
          />
        <p class="movie-name">${movie.title}</p>
      </div>
      </a>
    `;
    upcoming.innerHTML += html;
  });
};

//display tv shows
const displayTvShows = (data) => {
  const tvShows = data.tvShows.results;
  console.log(tvShows);
  tvShows.forEach((tvShow) => {
    const type = tvShow.media_type;
    const id = tvShow.id;
    const html = `
    <a href="movieDetails.html?type=tv&id=${id}">
        <div class="movie-card">
          <img
            class="movie-card-img"
            src="${IMG_URL}${tvShow.poster_path}"
            alt="image"
            data-movie-id=${tvShow.id}
          />
        <p class="movie-name">${tvShow.name}</p>
      </div>
      </a>
    `;
    shows.innerHTML += html;
  });
};

//display actors
// const showActors = (data) => {
//   const actors = data.results;
//   actors.forEach((actor) => {
//     const html = `
//         <div class="movie-card">
//           <img
//             class="movie-card-img"
//             src="${IMG_URL}${actor.profile_path}"
//             alt="image"
//             data-movie-id=${actor.id}
//           />
//         <p class="movie-name">${actor.name}</p>
//       </div>
//     `;
//     actors.innerHTML += html;
//   });
// };

const viewMovies = async (movie) => {
  const movies = await getMovies(movie);

  return { movies };
};
const viewUpcoming = async () => {
  const upcoming = await getUpcoming();

  return { upcoming };
};
const viewTopRated = async () => {
  const topRated = await getTopRated();

  return { topRated };
};
const viewTvShows = async () => {
  const tvShows = await getTvShows();

  return { tvShows };
};
// const viewActors = async () => {
//   const actors = await getActors();

//   return { actors };
// };

search.addEventListener("submit", (e) => {
  e.preventDefault();

  const movieSearch = search.movie.value.trim();
  search.reset();

  console.log(movieSearch);
  loader.classList.remove("hide");

  showMovies.innerHTML = "";

  viewMovies(movieSearch)
    .then((data) => {
      loader.classList.add("hide");
      updateUI(data);
    })
    .catch((err) => console.log(err));

  // set localStorage
  localStorage.setItem("movies", movieSearch);
  return movieSearch;
});

addEventListener("DOMContentLoaded", (e) => {
  viewUpcoming()
    .then((data) => upcomingMovies(data))
    .catch((err) => console.log(err));

  viewTopRated()
    .then((data) => topRatedMovies(data))
    .catch((err) => console.log(err));

  viewTvShows()
    .then((data) => displayTvShows(data))
    .catch((err) => console.log(err));
  // viewActors()
  //   .then((data) => showActors(data))
  //   .catch((err) => console.log(err));
});

//localStorage
if (localStorage.getItem("movies")) {
  viewMovies(localStorage.getItem("movies"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
