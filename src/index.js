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
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weathericon.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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

function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#inlineFormInputGroupUsername");
  let h1 = document.querySelector("h1");
  let lowCity = city.value;
  h1.innerHTML = lowCity;
  let key = "62f43ed8fcca18b9680c53a70280908f";
  let Url = `https://api.openweathermap.org/data/2.5/weather?q=${lowCity}&units=metric&appid=${key}`;
  axios.get(Url).then(showTemperature);
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
selectCity.addEventListener("submit", citySearch);

citySearch("New york");

let currentWeather = document.querySelector("#currentButton");
currentWeather.addEventListener("click", getCurrentPosition);

function formatDate(Date) {
  let hours = Date.getHours();
  let minuits = Date.getMinutes();
  let year = Date.getFullYear();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fry", "Sat"];
  let day = days[Date.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[Date.getMonth()];
  let showTime = `${day}, ${month}, ${hours}:${minuits}, ${year}`;
  let time = document.querySelector("#date");
  time.innerHTML = showTime;
}

console.log(formatDate(new Date()));
