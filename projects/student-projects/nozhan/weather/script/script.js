        let searchForm = document.getElementById("searchForm");
        let cityInput = document.getElementById("cityInput");
        let searchButton = document.getElementById("searchButton");
        let statusText = document.getElementById("status");
        let weatherPanel = document.getElementById("weatherPanel");
        let cityOptions = document.getElementById("cityOptions");

        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let city = cityInput.value.trim();
            if (city === "") {
                statusText.textContent = "Please enter a city name.";
                return;
            }
            searchCity(city);
        });

        async function searchCity(city) {
            searchButton.disabled = true;
            searchButton.textContent = "Searching...";
            statusText.textContent = "";
            cityOptions.innerHTML = "";

            try {
                let geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=3&language=en&format=json`;
                let geoResponse = await fetch(geoUrl);
                if (!geoResponse.ok) throw new Error("Could not connect to the location service.");
                let geoData = await geoResponse.json();

                if (!geoData.results || geoData.results.length === 0) {
                    throw new Error("City not found. Check the spelling and try again.");
                }

                if (geoData.results.length === 1) {
                    getWeather(geoData.results[0]);
                } else {
                    showCityOptions(geoData.results);
                    statusText.textContent = "Choose the correct location:";
                }
            } catch (error) {
                statusText.textContent = error.message;
            } finally {
                searchButton.disabled = false;
                searchButton.textContent = "Explore →";
            }
        }

        function showCityOptions(cities) {
            cityOptions.innerHTML = "";
            cities.forEach(function (city) {
                let button = document.createElement("button");
                button.className = "city-option";
                button.textContent = city.name + (city.admin1 ? ", " + city.admin1 : "") + ", " + city.country;
                button.addEventListener("click", function () {
                    cityOptions.innerHTML = "";
                    statusText.textContent = "";
                    getWeather(city);
                });
                cityOptions.appendChild(button);
            });
        }

        async function getWeather(place) {
            statusText.textContent = "Loading weather...";
            searchButton.disabled = true;

            try {
                let weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto&forecast_days=7`;
                let response = await fetch(weatherUrl);
                if (!response.ok) throw new Error("Weather data is temporarily unavailable.");
                let data = await response.json();

                showCurrentWeather(place, data);
                showHourlyForecast(data.hourly, data.current.time);
                showDailyForecast(data.daily);
                document.getElementById("sunrise").textContent = getTime(data.daily.sunrise[0]);
                document.getElementById("sunset").textContent = getTime(data.daily.sunset[0]);
                document.getElementById("uvIndex").textContent = data.daily.uv_index_max[0];
                document.getElementById("updatedText").textContent = "Local time: " + data.current.time.replace("T", " ") + " · Data supplied by Open-Meteo";
                weatherPanel.classList.add("visible");
                statusText.textContent = "";
                window.scrollTo({top: weatherPanel.offsetTop - 20, behavior: "smooth"});
            } catch (error) {
                statusText.textContent = error.message;
            } finally {
                searchButton.disabled = false;
                searchButton.textContent = "Explore →";
            }
        }

        function showCurrentWeather(place, data) {
            let current = data.current;
            document.getElementById("cityName").textContent = place.name;
            document.getElementById("countryName").textContent = [place.admin1, place.country].filter(Boolean).join(", ");
            document.getElementById("condition").textContent = getWeatherDescription(current.weather_code);
            document.getElementById("mainIcon").textContent = getWeatherIcon(current.weather_code, current.is_day);
            document.getElementById("temperature").textContent = Math.round(current.temperature_2m);
            document.getElementById("feelsLike").textContent = Math.round(current.apparent_temperature) + "°C";
            document.getElementById("humidity").textContent = current.relative_humidity_2m + "%";
            document.getElementById("windSpeed").textContent = Math.round(current.wind_speed_10m) + " km/h";
            document.getElementById("precipitation").textContent = current.precipitation + " mm";
            setWeatherBackground(current.weather_code);
        }

        function showHourlyForecast(hourly, currentTime) {
            let list = document.getElementById("hourlyList");
            list.innerHTML = "";
            let startIndex = hourly.time.findIndex(function (time) {return time >= currentTime;});
            if (startIndex < 0) startIndex = 0;

            for (let i = startIndex; i < startIndex + 8 && i < hourly.time.length; i++) {
                let card = document.createElement("div");
                card.className = "forecast-card";
                card.innerHTML = `<p class="forecast-time">${getTime(hourly.time[i])}</p><div class="forecast-icon">${getWeatherIcon(hourly.weather_code[i], 1)}</div><p class="forecast-temp">${Math.round(hourly.temperature_2m[i])}°</p>`;
                list.appendChild(card);
            }
        }

        function showDailyForecast(daily) {
            let list = document.getElementById("dailyList");
            list.innerHTML = "";
            for (let i = 0; i < daily.time.length; i++) {
                let date = new Date(daily.time[i] + "T12:00:00");
                let day = i === 0 ? "Today" : date.toLocaleDateString("en", {weekday: "long"});
                let row = document.createElement("div");
                row.className = "daily-row";
                row.innerHTML = `<span class="daily-day">${day}</span><span class="daily-icon">${getWeatherIcon(daily.weather_code[i], 1)}</span><span class="daily-condition">${getWeatherDescription(daily.weather_code[i])}</span><span class="daily-range">${Math.round(daily.temperature_2m_max[i])}° / ${Math.round(daily.temperature_2m_min[i])}°</span>`;
                list.appendChild(row);
            }
        }

        function getTime(dateTime) {
            return dateTime.split("T")[1].slice(0, 5);
        }

        function getWeatherDescription(code) {
            if (code === 0) return "Clear sky";
            if (code === 1) return "Mainly clear";
            if (code === 2) return "Partly cloudy";
            if (code === 3) return "Overcast";
            if ([45, 48].includes(code)) return "Fog";
            if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
            if ([61, 63, 65, 66, 67].includes(code)) return "Rain";
            if ([71, 73, 75, 77].includes(code)) return "Snow";
            if ([80, 81, 82].includes(code)) return "Rain showers";
            if ([85, 86].includes(code)) return "Snow showers";
            if (code === 95) return "Thunderstorm";
            if ([96, 99].includes(code)) return "Thunderstorm with hail";
            return "Mixed conditions";
        }

        function getWeatherIcon(code, isDay) {
            if (code === 0) return isDay ? "☀️" : "🌙";
            if ([1, 2].includes(code)) return isDay ? "🌤️" : "☁️";
            if ([3, 45, 48].includes(code)) return "☁️";
            if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "🌧️";
            if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️";
            if ([95, 96, 99].includes(code)) return "⛈️";
            return "🌡️";
        }

        function setWeatherBackground(code) {
            let type = "clear";
            if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code)) type = "rain";
            if ([71, 73, 75, 77, 85, 86].includes(code)) type = "snow";
            document.body.setAttribute("data-weather", type);
            makeParticles(type);
        }

        // Search for a city again to load its real weather from the API.
        function restoreRealWeather() {
            let city = document.getElementById("cityName").textContent;
            if (city && city !== "City") {
                searchCity(city);
            } else {
                document.body.setAttribute("data-weather", "clear");
                makeParticles("clear");
                document.getElementById("condition").textContent = "Search for a city to see its real weather.";
                document.getElementById("mainIcon").textContent = "☀️";
            }
        }

        function makeParticles(type) {
            let holder = document.getElementById("particles");
            holder.innerHTML = "";
            if (type === "clear") return;
            for (let i = 0; i < 35; i++) {
                let particle = document.createElement("span");
                particle.className = "particle";
                particle.textContent = type === "snow" ? "✦" : "|";
                particle.style.left = Math.random() * 100 + "%";
                particle.style.animationDuration = (type === "snow" ? 7 : 1.1 + Math.random() * 1.2) + "s";
                particle.style.animationDelay = (Math.random() * 5) + "s";
                particle.style.opacity = (0.25 + Math.random() * 0.6);
                holder.appendChild(particle);
            }
        
        }