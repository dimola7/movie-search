const search = document.querySelector("form");
const showMovies = document.querySelector(".movies");
//api doc instructs to add this url before every image url
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const updateUI = (data) => {
  const movies = data.movies.results;
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

const viewMovies = async (movie) => {
  const movies = await getMovies(movie);

  return { movies };
};

search.addEventListener("submit", (e) => {
  e.preventDefault();

  const movies = search.movie.value.trim();
  search.reset();

  showMovies.innerHTML = "";

  //   console.log(movies);
  viewMovies(movies)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  // set localStorage
  localStorage.setItem("movies", movies);
});

if (localStorage.getItem("movies")) {
  viewMovies(localStorage.getItem("movies"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
