let date = document.querySelector("#time");

let currentDate = new Date();
let hours = currentDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let day = currentDate.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

date.innerHTML = `${days[day]}: ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
     <div class="col-2">
              <div class="weatherDay">${formatDay(forecastDay.dt)}</div>
              <img
                src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="75"
              />
              <div class="weather-forecast-temperatures">
                <span class="max-temp"> ${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class="min-temp">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </div>
            </div> `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "203fa770242fcd2b9555d832a88ea567";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let currentTemp = document.querySelector("#number");
  currentTemp.innerHTML = temp;

  let weatherDescription = response.data.weather[0].description;
  let weather = document.querySelector("#weather-description");
  weather.innerHTML = weatherDescription;

  let humidity = Math.round(response.data.main.humidity);
  let humidityPercent = document.querySelector("#weather-humidity");
  humidityPercent.innerHTML = `Humidity: ${humidity}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  let windMiles = document.querySelector("#weather-wind");
  windMiles.innerHTML = `Wind: ${windSpeed}mph`;

  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  fahrenheitTemp = response.data.main.temp;
  getForecast(response.data.coord);
}

function searchPosition(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-button").value;

  searchCity(searchInput);
}

function searchCity(city) {
  let apiKey = "a6244f5636e152e1c98a09dc4d66a96a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Please enter a valid city.");
      }
    })
    .catch((error) => {
      alert(error.message);
    });
  axios.get(apiUrl).then(showTemp);
}

searchCity("Mesa");

let searchBar = document.querySelector("#enter-city");
searchBar.addEventListener("submit", searchPosition);

function displayCeclius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#number");
  celcius.classList.add("units-active");
  fahrenheit.classList.remove("units-active");
  let celciusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  currentTemp.innerHTML = Math.round(celciusTemp);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#number");
  celcius.classList.remove("units-active");
  fahrenheit.classList.add("units-active");
  currentTemp.innerHTML = Math.round(fahrenheitTemp);
}
let fahrenheitTemp = null;
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", displayCeclius);

let celciusTemp = null;
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheit);
