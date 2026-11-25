// گرفتن عناصر HTML

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");


// جستجوی شهر

async function searchWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    try {

        // دریافت مختصات شهر

        const geoURL =`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

        const geoResponse = await fetch(geoURL);

        const geoData = await geoResponse.json();

        if (!geoData.results) {
            alert("City not found!");
            return;
        }

        const location = geoData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;


        // دریافت اطلاعات آب و هوا

        const weatherURL =`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,surface_pressure&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`;

        const weatherResponse = await fetch(weatherURL);

        const weatherData = await weatherResponse.json();


        // نمایش اطلاعات

        showWeather(location, weatherData);
        saveRecentCity(location.name);
            displayRecentCities();
    } catch (error) {

        console.log(error);

        alert("Something went wrong!");

    }

}

function showWeather(location, data) {

    const current = data.current;
    changeBackground(current.weather_code, current.is_day);

    // نام شهر

    document.getElementById("city").innerText =
        location.name + ", " + location.country;


    // دما

    document.getElementById("temperature").innerText =
        Math.round(current.temperature_2m) + "°";


    // رطوبت

    document.getElementById("humidity").innerText =
        current.relative_humidity_2m + "%";


    // سرعت باد

    document.getElementById("wind").innerText =
        current.wind_speed_10m + " km/h";


    // فشار هوا

    document.getElementById("pressure").innerText =
        current.surface_pressure + " hPa";


    // دمای احساسی

    document.getElementById("feelsLike").innerText =
        Math.round(current.apparent_temperature) + "°";


    // وضعیت آب و هوا

    const weather = getWeatherInfo(
        current.weather_code,
        current.is_day
    );

    document.getElementById("description").innerText =
        weather.description;

    document.getElementById("weatherIcon").innerText =
        weather.icon;


    // تاریخ

    document.getElementById("date").innerText =
        new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
     showForecast(data);
}


function getWeatherInfo(code, isDay) {

    if (code === 0) {
        return {
            description: "Clear Sky",
            icon:"☀"
        };
    }

    if (code === 1 || code === 2) {
        return {
            description: "Partly Cloudy",
            icon: "🌤"
        };
    }

    if (code === 3) {
        return {
            description: "Overcast",
            icon: "🌤"
        };
    }

    if (code >= 45 && code <= 48) {
        return {
            description: "Foggy",
            icon: "🌫"
        };
    }

    if (code >= 51 && code <= 67) {
        return {
            description: "Rainy",
            icon: "🌧"
        };
    }

    if (code >= 71 && code <= 77) {
        return {
            description: "Snowy",
            icon: "❄"
        };
    }

    if (code >= 80 && code <= 82) {
        return {
            description: "Rain Showers",
            icon: "🌦"
        };
    }

    if (code >= 95) {
        return {
            description: "Thunderstorm",
            icon: "⛈"
        };
    }

    return {
        description: "Unknown Weather",
        icon: "🌡"
    };

}


searchBtn.addEventListener("click", searchWeather);

cityInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        searchWeather();
    }

});


function showForecast(data) {

    const forecastContainer = document.getElementById("forecastItems");

    // خالی کردن اطلاعات قبلی
    forecastContainer.innerHTML = "";

    // دریافت اطلاعات روزانه
    const daily = data.daily;
    console.log(daily);

    // ساخت کارت برای هر روز
    for (let i = 0; i < 5; i++) {

        // تبدیل تاریخ به نام روز
        const date = new Date(daily.time[i] + "T12:00:00");

        const day = date.toLocaleDateString("en-US", {
            weekday: "long"
        });

        // دریافت وضعیت هوا
        const weather = getWeatherInfo(daily.weather_code[i], 1);

        // ساخت کارت
        const card = document.createElement("div");

        card.classList.add("forecast-card");

        card.innerHTML =`
         <p>${day}</p>

            <span>${weather.icon}</span>

            <h3>${Math.round(daily.temperature_2m_max[i])}°</h3>

            <p>${Math.round(daily.temperature_2m_min[i])}°</p>
        `;

        forecastContainer.appendChild(card);

    }

}



function changeBackground(code, isDay) {

    const background = document.getElementById("background");

    background.className = "background";

    if (!isDay) {
        background.classList.add("night");
        return;
    }

    if (code === 0) {
        background.classList.add("sunny");
    }

    else if (code === 1 || code === 2 || code === 3) {
        background.classList.add("cloudy");
    }

    else if (code >= 45 && code <= 48) {
        background.classList.add("foggy");
    }

    else if (code >= 51 && code <= 67) {
        background.classList.add("rainy");
    }

    else if (code >= 71 && code <= 77) {
        background.classList.add("snowy");
    }

    else if (code >= 80 && code <= 82) {
        background.classList.add("rainy");
    }

    else if (code >= 95) {
        background.classList.add("stormy");
    }

    else {
        background.classList.add("cloudy");
    }

}


let recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];

function saveRecentCity(city) {

    if (recentCities.includes(city)) {
        return;
    }

    recentCities.unshift(city);

    if (recentCities.length > 5) {
        recentCities.pop();
    }

    localStorage.setItem("recentCities", JSON.stringify(recentCities));

}

function displayRecentCities() {

    const container = document.getElementById("recentCities");

    container.innerHTML = "";

    if (recentCities.length === 0) {
        container.innerHTML = '<div class="city-card">No recent cities</div>';
        return;
    }

    recentCities.forEach(city => {

        const card = document.createElement("div");
        card.classList.add("city-card");

        const cityName = document.createElement("span");
        cityName.textContent = city;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "×";
        deleteBtn.classList.add("delete-city");

        deleteBtn.addEventListener("click", function(event) {
            event.stopPropagation();

            recentCities = recentCities.filter(item => item !== city);

            localStorage.setItem("recentCities", JSON.stringify(recentCities));

            displayRecentCities();
        });

        card.addEventListener("click", function() {
            document.getElementById("cityInput").value = city;
            searchWeather();
        });

        card.appendChild(cityName);
        card.appendChild(deleteBtn);

        container.appendChild(card);

    });
}


displayRecentCities();