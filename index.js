const apikey = "0cbf041ff965fa13cb2fe9f79cf8807d";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const search = document.getElementById("searchBox");
const srcBtn = document.getElementById("searchBtn");
// const weatherIcon = document.getElementById("icon");

async function checkWeather(city) {
  const response = await fetch(apiurl + city + `&appid=${apikey}`);
  var data = await response.json();
  console.log(data);
  const loc = document.getElementById("loc");
  document.querySelector(".location").innerHTML = data.name;
  document.querySelector(".temprature").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

  if (data.weather[0].main == "Clouds") {
    weatherIcon.innerHTML = "cloud";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.innerHTML = "rainy";
  } else if (data.weather[0].main == "Snow") {
    weatherIcon.innerHTML = "cloudy_snowing";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.innerHTML = "clear_day";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.innerHTML = "rainy_light";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.innerHTML = "mist";
  }
}
checkWeather();
srcBtn.addEventListener("click", () => {
  checkWeather(search.value);
  search.value = "";
});


search.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    checkWeather(search.value);
    search.value = "";
  }
});



//Temprature according to Location

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}


async function showPosition(position) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=0cbf041ff965fa13cb2fe9f79cf8807d&units=metric`);
  var data = await response.json();
  document.querySelector(".location").innerHTML = data.name;
  document.querySelector(".temprature").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";
}

