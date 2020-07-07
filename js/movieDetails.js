const details = document.querySelector(".movie-details");

//api doc instructs to add this url before every image url
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const renderDetails = (data) => {
  const movie = data;
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
          two
        </div>
      </div>
        
    `;
  //   const mediaType = details.querySelector(".media-name");
  //   if (movie.media_type === movie) {
  //     mediaType.innerHTML = movie.title;
  //   } else {
  //     mediaType.innerHTML = movie.name;
  //   }
};

addEventListener("DOMContentLoaded", (e) => {
  const search = new URLSearchParams(window.location.search);

  const id = search.get("id");
  const type = search.get("type");

  console.log(type);
  console.log(id);

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
