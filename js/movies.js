const key = "331043863d75eae8bc883a2180100bbd";

//get movies
const getMovies = async (movie) => {
  const base = "https://api.themoviedb.org/3/search/multi";
  const query = `?api_key=${key}&query=${movie}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data;
};
//trending
const getTrending = async () => {
  const base = "https://api.themoviedb.org/3/trending/all/day";
  const query = `?api_key=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data;
};

//get top-rated movies
const getTopRated = async () => {
  const base = "https://api.themoviedb.org/3/movie/top_rated";
  const query = `?api_key=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data;
};

//get popular tv shows
const getTvShows = async () => {
  const base = "https://api.themoviedb.org/3/tv/popular";
  const query = `?api_key=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data;
};
//get movie details
const getMovieDets = async (movie_id) => {
  const base = `https://api.themoviedb.org/3/movie/${movie_id}`;
  const query = `?api_key=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data;
};
//get show details
const getTvDets = async (tv_id) => {
  const base = `https://api.themoviedb.org/3/tv/${tv_id}`;
  const query = `?api_key=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data;
};
//get movie reviews
const getMovieReviews = async (movie_id) => {
  const base = `https://api.themoviedb.org/3/movie/${movie_id}/reviews`;
  const query = `?api_key=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data;
};

//get tv reviews
const getTvReviews = async (tv_id) => {
  const base = `https://api.themoviedb.org/3/movie/${tv_id}/reviews`;
  const query = `?api_key=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data;
};
//display actors
// const getActors = async () => {
//   const base = "https://api.themoviedb.org/3/person/popular";
//   const query = `?api_key=${key}`;

//   const response = await fetch(base + query);
//   const data = await response.json();

//   return data;
// };

//   const mediaType = details.querySelector(".media-name");
//   if (movie.media_type === movie) {
//     mediaType.innerHTML = movie.title;
//   } else {
//     mediaType.innerHTML = movie.name;
//   }
