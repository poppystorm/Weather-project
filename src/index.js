function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
function displayforecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#dateForecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forcastDay, index) {
    if ((index > 0) & (index < 5)) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-3">
        <div class="weather-forecast-date">${formatDay(forcastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forcastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
          id="forcastPicture"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forcastDay.temp.max
          )}° |</span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forcastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });
  forecastElement.innerHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForcast(coordinates) {
  console.log(coordinates);
  let key = "62f43ed8fcca18b9680c53a70280908f";
  let ApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${key}&units=metric`;
  console.log(ApiUrl);
  axios.get(ApiUrl).then(displayforecast);
}
function showTemperature(response) {
  celsius = Math.round(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temp");
  temp.innerHTML = temperature;
  let humidity = response.data.main.humidity;
  let hum = document.querySelector("#hum");
  hum.innerHTML = humidity;
  let windspeed = response.data.wind.speed;
  let wind = document.querySelector("#wind");
  wind.innerHTML = windspeed;
  let city = document.querySelector("h1");
  let citydata = response.data.name;
  city.innerHTML = citydata;
  let weathericon = document.querySelector("#weatherIcon");
  weathericon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weathericon.setAttribute(
    "alt",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForcast(response.data.coord);
}

function showPosition(position) {
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  let key = "62f43ed8fcca18b9680c53a70280908f";
  let Url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&&units=metric&appid=${key}`;
  axios.get(Url).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function citySearch(city) {
  let key = "62f43ed8fcca18b9680c53a70280908f";
  let Url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
  console.log(Url);
  axios.get(Url).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector(
    `#inlineFormInputGroupUsername`
  );
  citySearch(cityInputElement.value);
}

function fahrenheitconversion() {
  let temperature = document.querySelector("#temp");
  let fahrenheittemp = (celsius * 9) / 5 + 32;
  console.log(fahrenheittemp);
  temperature.innerHTML = Math.round(fahrenheittemp);
}

function celsiusconversion() {
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(celsius);
}

let celsius = null;

let farhenheitlink = document.querySelector("#F");
farhenheitlink.addEventListener("click", fahrenheitconversion);

let clesiuslink = document.querySelector("#C");
clesiuslink.addEventListener("click", celsiusconversion);

let selectCity = document.querySelector("form");
selectCity.addEventListener("submit", handleSubmit);

let currentWeather = document.querySelector("#currentButton");
currentWeather.addEventListener("click", getCurrentPosition);

citySearch("New york");

function formatDate(Date) {
  let hours = Date.getHours();
  let minuits = Date.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[Date.getDay()];
  let showTime = `Last updated: ${day}, ${hours}:${minuits}h`;
  let time = document.querySelector("#date");
  time.innerHTML = showTime;
}

console.log(formatDate(new Date()));
