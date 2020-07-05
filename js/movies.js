const key = "331043863d75eae8bc883a2180100bbd";

//get movies
const getMovies = async (movie) => {
  const base = "https://api.themoviedb.org/3/search/multi";
  const query = `?api_key=${key}&query=${movie}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data;
};

//get upcoming movies
const getUpcoming = async () => {
  const base = "https://api.themoviedb.org/3/movie/upcoming";
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
