let form = document.getElementById('form');
let cityInput = document.getElementById('city');
let app = document.getElementById('app');

let cityName = document.getElementById('city-name');
let temperature = document.getElementById('temperature');
let humidity = document.getElementById('humidity');
let windSpeed = document.getElementById('wind-speed');

let dayPeriod = document.getElementById('day-period');
let dayStatus = document.getElementById('day-status');

let maxTemperature = document.getElementById('max-temperature');
let minTemperature = document.getElementById('min-temperature');
let rainChance = document.getElementById('rain-chance');

let scene = document.getElementById('weather-scene');
let errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async function(e) {
    e.preventDefault();

    let city = cityInput.value.trim();
    if (!city) return;

    app.dataset.state = 'loading';

    try {
        let latlng = await getLatLng(city);
        if (!latlng) throw new Error('شهر مورد نظر پیدا نشد!');

        let weather = await getWeather(latlng);
        showWeather(latlng, weather);

        app.dataset.state = 'ready';
    } catch (error) {
        errorMessage.textContent = error.message;
        app.dataset.state = 'error';
    }
});

async function getLatLng(city) {
    let url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=fa&format=json`;
    let result = await fetch(url);
    let data = await result.json();

    if (!data.results?.length) return null;

    let location = data.results[0];
    return [location.latitude, location.longitude, location.name, location.country];
}

async function getWeather(latlng) {
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${latlng[0]}&longitude=${latlng[1]}&current=temperature_2m,relative_humidity_2m,is_day,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code&timezone=auto&forecast_days=7`;

    let result = await fetch(url);
    return await result.json();
}

function showWeather(latlng, weather) {
    let current = weather.current;
    let daily = weather.daily;

    cityName.textContent = latlng[2] + '، ' + latlng[3];
    temperature.textContent = Math.round(current.temperature_2m);
    humidity.textContent = current.relative_humidity_2m;
    windSpeed.textContent = current.wind_speed_10m;
    maxTemperature.textContent = Math.round(daily.temperature_2m_max[0]);
    minTemperature.textContent = Math.round(daily.temperature_2m_min[0]);
    rainChance.textContent = daily.precipitation_probability_max[0];

    dayStatus.textContent = current.is_day ? 'روز' : 'شب';
    dayPeriod.dataset.period = current.is_day ? 'day' : 'night';

    let code = current.weather_code;
    let weatherClass = 'scene--sunny';

    if ([2, 3, 45, 48].includes(code)) {
        weatherClass = 'scene--cloudy';
    } else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code >= 95) {
        weatherClass = 'scene--rainy';
    } else if ((code >= 71 && code <= 77) || [85, 86].includes(code)) {
        weatherClass = 'scene--snowy';
    }

    scene.className = `scene ${weatherClass}${current.is_day ? '' : ' scene--night'}`;
}