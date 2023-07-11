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
}

function searchPosition(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-button");
  let apiKey = "a6244f5636e152e1c98a09dc4d66a96a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showTemp);
}

let searchBar = document.querySelector("#enter-city");
searchBar.addEventListener("submit", searchPosition);

function displayCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "a6244f5636e152e1c98a09dc4d66a96a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayCurrentPosition);
}

let CurrentButton = document.querySelector("#current-button");
CurrentButton.addEventListener("click", getCurrentPosition);
