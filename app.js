const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");
const weatherInfoElement = document.getElementById("weather-info");
const searchWeatherDiv = document.getElementById("search-weather");
const searchIcon = document.getElementById("search-icon");
searchButton.addEventListener("click", handleSearchButtonClick);
cityInput.addEventListener("keydown", handleEnterKeyPress);
searchIcon.addEventListener("click", () =>
  searchWeatherDiv.classList.remove("search-weather-input")
);

function handleSearchButtonClick() {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
    searchWeatherDiv.classList.add("search-weather-input");
    searchIcon.classList.add("search-icon-visiblity");
  } else {
    alert("Please enter a city name");
  }
}

function handleEnterKeyPress(event) {
  if (event.key === "Enter") {
    searchButton.click();
  }
}

function getWeather(city) {
  const cachedWeather = localStorage.getItem(city);
  if (cachedWeather) {
    const weather = JSON.parse(cachedWeather);
    displayWeather(weather);
  } else {
    fetchWeatherData(city)
      .then((weather) => {
        localStorage.setItem(city, JSON.stringify(weather));
        displayWeather(weather);
      })
      .catch((error) => console.error(error));
  }
}

function fetchWeatherData(city) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bd892be8825eb13293fb64432eec1d34&units=metric`
  ).then((response) => response.json());
}

function displayWeather(weather) {
  const weatherHTML = ` <h2>${weather.name}</h2>
    <img src="https://openweathermap.org/img/wn/${
      weather.weather[0].icon
    }@2x.png" width="150px"/>
   
    <p class="temperature"> ${Math.round(weather.main.temp)}&#8451;</p>
    <small>${weather.weather[0].main}<small/>

    <div class="weather-info">
      <div class="info-container">
        <i class="fa-light fa-wind"></i>
        <h3>${Math.ceil(
          weather.wind.speed * 3.6
        )}<span class="sub">km/h<span/></h3>
        <p>Wind</p>
      </div>

      <div class="vr"></div>

      <div class="info-container">
        <i class="fa-sharp fa-thin fa-droplet"></i>
        <h3>${weather.main.humidity}<span class="sub">%<span/></h3>
        <p>Humidity</p>
      </div>
    </div>
  `;

  weatherInfoElement.innerHTML = weatherHTML;
}

// document.getElementById("search-button").addEventListener("click", () => {
//   const city = document.getElementById("city-input").value;

//   if (city) {
//     getWeather(city);
//   } else {
//     alert("Please enter a city name");
//   }
// });

// document.getElementById("city-input").addEventListener("keydown", (e) => {
//   if (e.key === "Enter") {
//     document.getElementById("search-button").click();
//   }
// });

// const getWeather = (city) => {
//   const storage = localStorage.getItem(city);
//   if (storage) {
//     const weatherData = JSON.parse(storage);
//     console.log("I've data", weatherData);
//     displayWeather(weatherData);
//   } else {
//     console.log("I don't have data");
//     fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bd892be8825eb13293fb64432eec1d34&units=metric`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         const weatherData = data;
//         localStorage.setItem(city, JSON.stringify(data));
//         console.log("Fetching data....", data);

//         displayWeather(weatherData);
//       })
//       .catch((error) => console.log(error));
//   }
// };

// const displayWeather = (data) => {
//   const infoDiv = document.getElementById("weather-info");
//   infoDiv.innerHTML = `
//   <img src="https://openweathermap.org/img/wn/${
//     data.weather[0].icon
//   }@2x.png" width="150px"/>

//   <h2>${data.name}</h2>

//   <p class="temperature"> ${Math.round(data.main.temp)}&#8451;</p>
// <small>${data.weather[0].main}<small/>

//   <div class="weather-info">

//   <div class="info-container">
//     <i class="fa-light fa-wind"></i>
//     <h3>${Math.ceil(data.wind.speed * 3.6)}<span class="sub">km/h<span/></h3>
//     <p>Wind</p>
//   </div>

//   <div class="vr"></div>

//   <div class="info-container">
//     <i class="fa-sharp fa-thin fa-droplet"></i>
//     <h3>${data.main.humidity}<span class="sub">%<span/></h3>
//     <p>Humidity</p>
//   </div>

// </div>`;
// };
