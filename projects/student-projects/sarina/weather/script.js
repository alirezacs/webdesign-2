let city = document.querySelector("#city");
let search = document.querySelector("#search");
let message = document.querySelector("#message");

let name = document.querySelector("#name");
let temp = document.querySelector("#temp");
let condition = document.querySelector("#condition");
let icon = document.querySelector("#icon");

search.addEventListener("click", function () {
    let cityName = city.value;

    message.textContent = "Searching for " + cityName + "...";
    console.log(cityName);
});

search.addEventListener("click", async function () {
    let cityName = city.value;

if (cityName == "") {
    message.textContent = "Please enter a city name!";
    return;
}

    message.textContent = "Searching...";

    let response = await fetch(
        "https://geocoding-api.open-meteo.com/v1/search?name=" + cityName + "&count=1&language=en&format=json"
    );

    let data = await response.json();

    if (data.results) {
        let place = data.results[0];

name.textContent = place.name;
message.textContent = "Loading weather...";

let weatherResponse = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=" +
    place.latitude + "&longitude=" + place.longitude +
    "&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,pressure_msl,visibility,cloud_cover,uv_index,precipitation,weather_code" +
    "&hourly=temperature_2m,weather_code" +
    "&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max" +
    "&timezone=auto&forecast_days=1"
);

let weatherData = await weatherResponse.json();

temp.textContent = weatherData.current.temperature_2m;
let code = weatherData.current.weather_code;

if (code == 0) {
    condition.textContent = "Clear sky";
    icon.textContent = "☀️";
} else if (code <= 3) {
    condition.textContent = "Partly cloudy";
    icon.textContent = "🌤️";
} else if (code <= 48) {
    condition.textContent = "Foggy";
    icon.textContent = "🌫️";
} else if (code <= 67) {
    condition.textContent = "Rainy";
    icon.textContent = "🌧️";
} else if (code <= 77) {
    condition.textContent = "Snowy";
    icon.textContent = "❄️";
} else if (code <= 82) {
    condition.textContent = "Rain showers";
    icon.textContent = "🌦️";
} else {
    condition.textContent = "Thunderstorm";
    icon.textContent = "⛈️";
}

feels.textContent = weatherData.current.apparent_temperature;

document.querySelector("#humidity").textContent =
    weatherData.current.relative_humidity_2m;

document.querySelector("#wind").textContent =
    weatherData.current.wind_speed_10m;

document.querySelector("#pressure").textContent =
    weatherData.current.pressure_msl;

document.querySelector("#visibility").textContent =
    (weatherData.current.visibility / 1000).toFixed(1);

document.querySelector("#clouds").textContent =
    weatherData.current.cloud_cover + "%";

document.querySelector("#uv").textContent =
    weatherData.current.uv_index;

document.querySelector("#rain").textContent =
    weatherData.daily.precipitation_probability_max[0];

document.querySelector("#high").textContent =
    weatherData.daily.temperature_2m_max[0];

document.querySelector("#low").textContent =
    weatherData.daily.temperature_2m_min[0];

document.querySelector("#sunrise").textContent =
    weatherData.daily.sunrise[0].split("T")[1];

document.querySelector("#sunset").textContent =
    weatherData.daily.sunset[0].split("T")[1];

let hours = document.querySelector("#hours");
let hourly = weatherData.hourly;

hours.innerHTML = "";

for (let i = 0; i < 6; i++) {
    let time = hourly.time[i].split("T")[1];
    let temperature = hourly.temperature_2m[i];
    let code = hourly.weather_code[i];
    let emoji = "☀️";

    if (code >= 1 && code <= 3) {
        emoji = "🌤️";
    } else if (code >= 45 && code <= 48) {
        emoji = "🌫️";
    } else if (code >= 51 && code <= 67) {
        emoji = "🌧️";
    } else if (code >= 71 && code <= 77) {
        emoji = "❄️";
    } else if (code >= 80 && code <= 82) {
        emoji = "🌦️";
    } else if (code >= 95) {
        emoji = "⛈️";
    }

    hours.innerHTML +=
        '<div class="hour"><p>' + time +
        '</p><span>' + emoji +
        '</span><h4>' + temperature + '°</h4></div>';
}

message.textContent = "Weather loaded successfully!";

    } else {
        message.textContent = "City not found!";
    }
});
