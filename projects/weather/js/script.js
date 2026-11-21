let cityInput = document.getElementById('city');
let form = document.getElementById('form');

form.addEventListener('submit', async e => {
    e.preventDefault();

    const latlng = await getLatLng(cityInput.value);

    const weather = await getWeatherInfoFromApi(latlng);
    
})

const getLatLng = async (city) => {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=5&language=en&format=json`

    const result = await fetch(url);
    const response = await result.json();

    const { latitude, longitude } = response.results[0];    
    
    return [latitude, longitude];
}

const getWeatherInfoFromApi = async (latlng) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latlng[0]}&longitude=${latlng[1]}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,wind_speed_10m&hourly=temperature_2m,precipitation_probability,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&timezone=auto&forecast_days=7`

    const result = await fetch(url);

    const response = await result.json();

    document.getElementById('box').innerHTML = `
        <h1>Temperature: ${response.current.temperature_2m}</h1>
        <h1>Is Day: ${response.current.is_day}</h1>
        <h1>Wind Speed: ${response.current.wind_speed_10m}</h1>
    `
    
}
