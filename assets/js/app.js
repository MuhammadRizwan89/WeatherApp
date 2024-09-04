const container = document.querySelector(".container");
const search = document.querySelector(".searchBox button");
const weatherBox = document.querySelector(".weatherBox");
const weatherDetail = document.querySelector(".weather-detail");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "215aedfa40d977da3919279d768df186";
  const city = document.querySelector(".searchBox input").value;

  if (city == "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod == "404") {
        container.style.height = "400px";
        weatherBox.classList.remove("active");
        weatherDetail.classList.remove("active");
        error404.classList.add("active");
        return;
      }

      container.style.height = "555px";
      weatherBox.classList.add("active");
      weatherDetail.classList.add("active");
      error404.classList.remove("active");

      const image = document.querySelector(".weatherBox img");
      const temperature = document.querySelector(".weatherBox .temperature");
      const description = document.querySelector(".weatherBox .description");
      const humidity = document.querySelector(".weather-detail .humidity span");
      const wind = document.querySelector(".weather-detail .wind span");

      switch (json.weather[0].main) {
        
        case "ClearDay":
          image.src = "./assets/images/clear-day.svg";
          break;

        case "ClearNight":
          image.src = "./assets/images/clear-night.svg";
          break;

        case "Cold":
          image.src = "./assets/images/cold.svg";
          break;

        case "wind":
          image.src = "./assets/images/wind.svg";
          break;

        case "snow":
          image.src = "./assets/images/snow.gif";
          break;

        default:
          image.src = "./assets/images/clear.gif";
      }

      temperature.innerHTML = `${parseInt(json.main.temp - 273.15)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;
    });
});
