const apiKey = "afff53afbffcd441eb0ed21b432c6ce8";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=it&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
  } else {
    let data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/s";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "assets/img/cloudy.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "assets/img/sun.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "assets/img/rain.png";
    } else if (data.weather[0].main == "drizzle") {
      weatherIcon.src = "assets/img/rainy-day.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "assets/img/mist.png";
    }
    document.querySelector(".error").style.display = "none";
  }
}

searchBox.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    checkWeather(searchBox.value);
  }
});

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

checkWeather();
