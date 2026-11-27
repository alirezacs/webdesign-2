
const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");

async function getWeather() {

    const city = cityInput.value.trim();

    if (!city) {
        alert("نام شهر را وارد کن");
        return;
    }

    try {

        // دریافت مختصات شهر
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=fa&format=json`;

        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            alert("شهر پیدا نشد!");
            return;
        }

        const location = geoData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;

        // دریافت اطلاعات آب و هوا
        const weatherUrl =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;

        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        // نمایش اطلاعات
        document.getElementById("cityName").innerText =
            location.name;

        document.getElementById("temperature").innerText =
            weatherData.current.temperature_2m + " °C";

        document.getElementById("description").innerText =
            "رطوبت: " +
            weatherData.current.relative_humidity_2m + "%";

    } catch (error) {

        alert("مشکلی در دریافت اطلاعات پیش آمد");

        console.log(error);
    }
}

searchBtn.addEventListener("click", getWeather);
