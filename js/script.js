const search = document.querySelector("form");
const showMovies = document.querySelector(".movies");
const loader = document.querySelector(".loader");
const title = document.querySelector(".movie-title");
const trend = document.querySelector(".trending");
const shows = document.querySelector(".shows");
const topRated = document.querySelector(".top-rated");
const logo = document.querySelector(".logo");
const card = document.querySelector(".header-card");
const form = document.querySelector(".search");
const rightButton = document.querySelector(".end");
const leftButton = document.querySelector(".start");
const trendLeft = document.querySelector(".trend-left");
const trendRight = document.querySelector(".trend-right");
const ratedLeft = document.querySelector(".rated-left");
const ratedRight = document.querySelector(".rated-right");
const searchLeft = document.querySelector(".search-left");
const searchRight = document.querySelector(".search-right");
const slides = document.querySelector(".slider").children;

rightButton.onclick = () => {
  document.querySelector(".shows").scrollLeft += 200;
};
leftButton.onclick = () => {
  document.querySelector(".shows").scrollLeft -= 200;
};
trendLeft.onclick = () => {
  document.querySelector(".trending").scrollLeft -= 200;
};
trendRight.onclick = () => {
  document.querySelector(".trending").scrollLeft += 200;
};
ratedLeft.onclick = () => {
  document.querySelector(".top-rated").scrollLeft -= 200;
};
ratedRight.onclick = () => {
  document.querySelector(".top-rated").scrollLeft += 200;
};
searchLeft.onclick = () => {
  document.querySelector(".movies").scrollLeft -= 200;
};
searchRight.onclick = () => {
  document.querySelector(".movies").scrollLeft += 200;
};

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

//display trending movies and tv shows
const showTrending = (data) => {
  const trending = data.trending.results;
  console.log(trending);
  trending.forEach((trending) => {
    const type = trending.media_type;
    const id = trending.id;
    const html = `
    <a href="movieDetails.html?type=movie&id=${id}">
        <div class="movie-card">
          <img
            class="movie-card-img"
            src="${IMG_URL}${trending.poster_path}"
            alt="image"
            data-movie-id=${trending.id}
          />
        <p class="movie-name">${trending.title || trending.name}</p>
      </div>
      </a>
    `;
    trend.innerHTML += html;
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

  searchLeft.onclick = () => {
    document.querySelector(".movies").scrollLeft -= 200;
  };
  searchRight.onclick = () => {
    document.querySelector(".movies").scrollLeft += 200;
  };

  loader.classList.remove("hide");

  showMovies.innerHTML = "";

  viewMovies(movieSearch)
    .then((data) => {
      loader.classList.add("hide");
      searchLeft.classList.remove("hide");
      searchRight.classList.remove("hide");
      updateUI(data);
    })
    .catch((err) => console.log(err));

  title.innerHTML = `<h1>${movieSearch}</h1>`;

  // set localStorage
  localStorage.setItem("movies", movieSearch);
  return movieSearch;
});

//localStorage
if (localStorage.getItem("movies")) {
  viewMovies(localStorage.getItem("movies"))
    .then((data) => {
      loader.classList.add("hide");
      searchLeft.classList.remove("hide");
      searchRight.classList.remove("hide");
      updateUI(data);
    })
    .catch((err) => console.log(err));
}

addEventListener("DOMContentLoaded", (e) => {
  viewTrending()
    .then((data) => showTrending(data))
    .catch((err) => console.log(err));

  viewTopRated()
    .then((data) => topRatedMovies(data))
    .catch((err) => console.log(err));

  viewTvShows()
    .then((data) => displayTvShows(data))
    .catch((err) => console.log(err));
});

// carousel in header
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

const autoPlay = () => {
  nextSlide();
};

let timer = setInterval(autoPlay, 7000);
