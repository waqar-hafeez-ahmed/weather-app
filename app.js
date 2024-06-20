document.getElementById("search-button").addEventListener("click", () => {
  const city = document.getElementById("city-input").value;

  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name");
  }
});

document.getElementById("city-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    document.getElementById("search-button").click();
  }
});

const getWeather = (city) => {
  const storage = localStorage.getItem(city);
  if (storage) {
    const weatherData = JSON.parse(storage);
    console.log("I've data", weatherData);
    displayWeather(weatherData);
  } else {
    console.log("I don't have data");
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bd892be8825eb13293fb64432eec1d34&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        const weatherData = data;
        localStorage.setItem(city, JSON.stringify(data));
        console.log("Fetching data....", data);

        displayWeather(weatherData);
      })
      .catch((error) => console.log(error));
  }
};

const displayWeather = (data) => {
  const infoDiv = document.getElementById("weather-info");
  infoDiv.innerHTML = `<h2>${data.name}</h2>
  <h3>Temperature : ${data.main.temp}</h3>
  <h3>Feels Like : ${data.main.feels_like}</h3>`;
};
