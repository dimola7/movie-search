const search = document.querySelector("form");
const showMovies = document.querySelector(".movies");
const trend = document.querySelector(".trending");
const loader = document.querySelector(".loader");
const title = document.querySelector(".movie-title");
const upcoming = document.querySelector(".upcoming");
const shows = document.querySelector(".shows");
const topRated = document.querySelector(".top-rated");
const logo = document.querySelector(".logo");
const card = document.querySelector(".header-card");
const form = document.querySelector(".search");
const slides = document.querySelector(".slider").children;
const indicator = document.querySelector(".indicator");

//gsap animation for logo and search bar to slide down
const tl = new TimelineMax();

tl.fromTo(logo, 1, { height: "80%" }, { height: "5%", ease: Power2.easeInOut })
  .fromTo(form, 0.4, { top: "-15%" }, { top: "5%", ease: Power2.easeInOut })
  .fromTo(
    card,
    0.4,
    { maxHeight: "0%" },
    { maxHeight: "50%", ease: Power2.easeInOut }
  );

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
//display trending
const showTrending = (data) => {
  const trending = data.trending.results;
  console.log(trending);
  trending.forEach((trending) => {
    const type = trending.media_type;
    const id = trending.id;
    const html = `
    <a href="movieDetails.html?type=${type}&id=${id}">
        <div class="trending-card">
          <img
            class="trending-img"
            src="${IMG_URL}${trending.backdrop_path}"
            alt="image"
            data-movie-id=${trending.id}
          />
        <p class="trending-name">${trending.title || trending.name}</p>
      </div>
      </a>
    `;
    trend.innerHTML += html;
  });
};
//display topRated movies
const topRatedMovies = (data) => {
  const movies = data.topRated.results.reverse();
  console.log(movies);
  movies.forEach((movie) => {
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
const viewTrending = async () => {
  const trending = await getTrending();

  return { trending };
};

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

  title.innerHTML = `<h1>${movieSearch}</h1>`;

  // set localStorage
  localStorage.setItem("movies", movieSearch);
  return movieSearch;
});

addEventListener("DOMContentLoaded", (e) => {
  viewTrending()
    .then((data) => showTrending(data))
    .catch((err) => console.log(err));

  viewUpcoming()
    .then((data) => upcomingMovies(data))
    .catch((err) => console.log(err));

  viewTopRated()
    .then((data) => topRatedMovies(data))
    .catch((err) => console.log(err));

  viewTvShows()
    .then((data) => displayTvShows(data))
    .catch((err) => console.log(err));
});

//localStorage
if (localStorage.getItem("movies")) {
  viewMovies(localStorage.getItem("movies"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}

let index = 0;

const prevSlide = () => {
  if (index == 0) {
    index = slides.length - 1;
  } else {
    index--;
  }
  changeSlide();
};

const nextSlide = () => {
  if (index == slides.length - 1) {
    index = 0;
  } else {
    index++;
  }
  changeSlide();
};

const changeSlide = () => {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }

  slides[index].classList.add("active");
};

const resetTimer = () => {
  // stop timer
  clearInterval(timer);
  // then started again timer
  timer = setInterval(autoPlay, 4000);
};

const autoPlay = () => {
  nextSlide();
  updateCircleIndicator();
};

let timer = setInterval(autoPlay, 4000);
