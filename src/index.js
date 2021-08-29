function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temp");
  temp.innerHTML = temperature;
  let humidity = response.data.main.humidity;
  let hum = document.querySelector("#hum");
  hum.innerHTML = humidity;
  let windspeed = response.data.wind.speed;
  let wind = document.querySelector("#wind");
  wind.innerHTML = windspeed;
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

let selectCity = document.querySelector("form");
selectCity.addEventListener("submit", citySearch);

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
    "Dec"
  ];
  let month = months[Date.getMonth()];
  let showTime = `${day}, ${month}, ${hours}:${minuits}, ${year}`;
  let time = document.querySelector("#date");
  time.innerHTML = showTime;
}

console.log(formatDate(new Date()));
