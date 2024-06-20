const movie = "wanted"; // It will be passed in input field.
const apiKey = "ea62d7ca1ebe44079b1812b8bd6ee0a2";

function getMovie(movie) {
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
