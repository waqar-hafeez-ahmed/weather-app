const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");
const weatherInfoDiv = document.getElementById("weather-info");
const searchWeatherDiv = document.getElementById("search-weather");
const searchIcon = document.getElementById("search-icon");
const loadingMsg = document.getElementById("loading");

const handleSearchAgain = () => {
  // Created a function to reset the app to its initial position.
  searchWeatherDiv.classList.remove("search-weather-input");
  weatherInfoDiv.innerHTML = "";
  searchIcon.classList.remove("search-icon-visiblity");
  cityInput.value = "";
};

const handleSearchButton = () => {
  const city = cityInput.value;
  if (!city) {
    alert("Please enter a city name");
    return;
  }
  getWeather(city);
  // Removing the weather title and search button input div. And adding the search icon at the same time.
  searchWeatherDiv.classList.add("search-weather-input");
  searchIcon.classList.add("search-icon-visiblity");
};

// Adding a click event on the key press.
const handleEnterKey = (event) => {
  if (event.key === "Enter") {
    if (event.target === cityInput) {
      handleSearchButton();
    } else if (event.target === searchIcon) {
      handleSearchAgain();
    }
  }
};

const getWeather = (city) => {
  // Fetching data from local storage.
  loadingMsg.style.display = "block";
  const storedWeather = localStorage.getItem(city);
  if (storedWeather) {
    const weather = JSON.parse(storedWeather);
    loadingMsg.style.display = "none";
    displayWeather(weather);
  } else {
    // Fetch data in case we don't have data in storage.
    fetchWeatherData(city);
  }

  function fetchWeatherData(city) {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bd892be8825eb13293fb64432eec1d34&units=metric`
    )
      .then((response) => response.json())
      .then((weather) => {
        if (weather.cod == 404) {
          alert(weather.message);
          loadingMsg.style.display = "none";
          handleSearchAgain();
          return;
        } else {
          localStorage.setItem(city, JSON.stringify(weather));
          loadingMsg.style.display = "none";
          displayWeather(weather);
        }
      })
      .catch((error) => console.log(error));
  }
};

function displayWeather(weather) {
  const weatherHTML = ` <h2>${weather.name}</h2>
    <img src="https://openweathermap.org/img/wn/${
      weather.weather[0].icon
    }@2x.png" width="150px" alt="Icon"/>
    <p class="temperature"> ${Math.round(weather.main.temp)}<sup>o</sup></p>
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
  weatherInfoDiv.innerHTML = weatherHTML;
}

// Adding click events to the event handlers
searchButton.addEventListener("click", handleSearchButton);
cityInput.addEventListener("keydown", handleEnterKey);
searchIcon.addEventListener("click", handleSearchAgain);
searchIcon.addEventListener("keydown", handleEnterKey);
