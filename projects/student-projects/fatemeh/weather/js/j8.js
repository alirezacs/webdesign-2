
let cityInput = document.getElementById("cityinput");
let form = document.getElementById("form");

let sky = document.getElementById("sky");

let cityText = document.getElementById("city");
let countryText = document.getElementById("country");

let tempText = document.getElementById("temp");
let descriptionText = document.getElementById("description");

let feelsText = document.getElementById("feels");
let humidityText = document.getElementById("humidity");
let windText = document.getElementById("wind");
let skyStatusText = document.getElementById("sky-status");

let sunriseText = document.getElementById("sunrise");
let sunsetText = document.getElementById("sunset");



sky.muted = true;
sky.volume = 0;


// پخش ویدئوی اولیه
sky.play().catch(() => {
    console.log("Click anywhere to start the background video.");
});


// اگر ویدئو متوقف شد، با کلیک دوباره پخش شود
document.addEventListener("click", () => {

    sky.muted = true;
    sky.volume = 0;

    if (sky.paused) {
        sky.play().catch((error) => {
            console.log(error);
        });
    }

});



form.addEventListener("submit", async (e) => {

    e.preventDefault();

    let city = cityInput.value.trim();

    if (city === "") {
        return;
    }

    descriptionText.innerText = "Loading weather information...";

    try {

        let location = await getCity(city);

        let weather = await getWeather(
            location.latitude,
            location.longitude
        );

        showWeather(weather, location);

    } catch (error) {

        console.log(error);

        descriptionText.innerText = "City not found!";
        cityText.innerText = "Weather";
        countryText.innerText = "Please try another city";

    }

});



let getCity = async (city) => {

    let url =
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=5&language=en&format=json`;

    let result = await fetch(url);

    if (!result.ok) {
        throw new Error("City search failed");
    }

    let response = await result.json();

    if (!response.results || response.results.length === 0) {
        throw new Error("City not found");
    }

    return response.results[0];

};



let getWeather = async (latitude, longitude) => {

    let url =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&daily=sunrise,sunset&timezone=auto`;

    let result = await fetch(url);

    if (!result.ok) {
        throw new Error("Weather information failed");
    }

    let response = await result.json();

    return response;

};



let showWeather = (weather, location) => {

    let current = weather.current;
    let daily = weather.daily;

    cityText.innerText = location.name;
    countryText.innerText = location.country;

    tempText.innerText = Math.round(current.temperature_2m);

    feelsText.innerText =
        Math.round(current.apparent_temperature) + "°";

    humidityText.innerText =
        current.relative_humidity_2m + "%";

    windText.innerText =
        current.wind_speed_10m + " km/h";

    sunriseText.innerText =
        daily.sunrise[0].slice(11, 16);

    sunsetText.innerText =
        daily.sunset[0].slice(11, 16);

    let code = current.weather_code;
    let isDay = current.is_day;

    let weatherName = getWeatherName(code);

    descriptionText.innerText = weatherName;
    skyStatusText.innerText = weatherName;

    changeSky(
        code,
        isDay,
        current.time,
        daily.sunrise[0],
        daily.sunset[0]
    );

};


let getWeatherName = (code) => {

    if (code === 0) return "Clear sky";

    if (code === 1) return "Mainly clear";

    if (code === 2) return "Partly cloudy";

    if (code === 3) return "Overcast";

    if (code === 45 || code === 48) return "Fog";

    if (code >= 51 && code <= 57) return "Drizzle";

    if (code >= 61 && code <= 67) return "Rain";

    if (code >= 71 && code <= 77) return "Snow";

    if (code >= 80 && code <= 82) return "Rain showers";

    if (code >= 85 && code <= 86) return "Snow showers";

    if (code >= 95) return "Thunderstorm";

    return "Unknown weather";

};


// تبدیل ساعت به دقیقه
let toMinutes = (time) => {

    let parts = time.slice(11, 16).split(":");

    return Number(parts[0]) * 60 + Number(parts[1]);

};


// تغییر ویدئوی پس زمینه
let changeSky = (code, isDay, currentTime, sunrise, sunset) => {

    let video = "";

    let now = toMinutes(currentTime);
    let morning = toMinutes(sunrise);
    let evening = toMinutes(sunset);

    let day = Number(isDay) === 1;


   
    if (
        (code >= 51 && code <= 67) ||
        (code >= 80 && code <= 82)
    ) {

        video = "rain.mp4";

    }

 
    else if (
        (code >= 71 && code <= 77) ||
        (code >= 85 && code <= 86)
    ) {

        video = "snow.mp4";

    }

  
    else if (code >= 95) {

        video = "storm.mp4";

    }

  
    else if (code === 45 || code === 48) {

        video = "fog.mp4";

    }

   
    else if (Math.abs(now - morning) <= 45) {

        video = "sunrise.mp4";

    }

    
    else if (Math.abs(now - evening) <= 45) {

        video = "sunset.mp4";

    }

    else if (code >= 1 && code <= 3) {

        if (day) {
            video = "day-cloudy.mp4";
        } else {
            video = "night-cloudy.mp4";
        }

    }

    else {

        if (day) {
            video = "day-clear.mp4";
        } else {
            video = "night-clear.mp4";
        }

    }


    // آدرس ویدئو
    let videoPath = "./videos/" + video;


    // قطع صدای همه ویدئوها
    sky.muted = true;
    sky.volume = 0;


    // تغییر و پخش ویدئو
    if (sky.getAttribute("src") !== videoPath) {

        sky.src = videoPath;

        sky.load();

    }

    sky.play().catch((error) => {

        console.log("Video playback error:", error);

    });

};



