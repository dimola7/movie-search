const search = document.querySelector("form");
const showMovies = document.querySelector(".movies");
const loader = document.querySelector(".loader");
const title = document.querySelector(".movie-title");
const upcoming = document.querySelector(".upcoming");
const topRated = document.querySelector(".top-rated");
//api doc instructs to add this url before every image url
const IMG_URL = "https://image.tmdb.org/t/p/w500";

//display searched movie results
const updateUI = (data) => {
  const movies = data.movies.results;
  console.log(data);
  title.innerHTML = `<h1>search title goes here</h1>`;
  movies.forEach((movie) => {
    if (movie.poster_path) {
      const html = `
     <div class="movie-card">
          <img
            class="movie-card-img"
            src="${IMG_URL}${movie.poster_path}"
            alt="image"
            data-movie-id=${movie.id}
          />
        <p class="movie-name">${movie.title}</p>
      </div>
        `;
      showMovies.innerHTML += html;
    }
  });
};
//display topRated movies
const topRatedMovies = (data) => {
  const movies = data.topRated.results.reverse();
  movies.forEach((movie) => {
    const html = `
        <div class="movie-card">
          <img
            class="movie-card-img"
            src="${IMG_URL}${movie.poster_path}"
            alt="image"
            data-movie-id=${movie.id}
          />
        <p class="movie-name">${movie.title}</p>
      </div>
    `;
    topRated.innerHTML += html;
  });
};
//display upcoming movies
const upcomingMovies = (data) => {
  const movies = data.upcoming.results;
  movies.forEach((movie) => {
    const html = `
        <div class="movie-card">
          <img
            class="movie-card-img"
            src="${IMG_URL}${movie.poster_path}"
            alt="image"
            data-movie-id=${movie.id}
          />
        <p class="movie-name">${movie.title}</p>
      </div>
    `;
    upcoming.innerHTML += html;
  });
};

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
search.addEventListener("submit", (e) => {
  e.preventDefault();

  const movies = search.movie.value.trim();
  search.reset();

  loader.classList.remove("hide");

  showMovies.innerHTML = "";

  viewMovies(movies)
    .then((data) => {
      loader.classList.add("hide");
      updateUI(data);
    })
    .catch((err) => console.log(err));

  // set localStorage
  localStorage.setItem("movies", movies);
});

addEventListener("DOMContentLoaded", (e) => {
  viewUpcoming()
    .then((data) => upcomingMovies(data))
    .catch((err) => console.log(err));

  viewTopRated()
    .then((data) => topRatedMovies(data))
    .catch((err) => console.log(err));
});

//localStorage
if (localStorage.getItem("movies")) {
  viewMovies(localStorage.getItem("movies"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
