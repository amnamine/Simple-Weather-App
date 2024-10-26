async function fetchWeather() {
    const city = document.getElementById('city-input').value;
    if (!city) return alert("Please enter a city name");

    const apiKey = '3809c22f869e1f92369d9811c1cbd93f';  // Your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            alert(data.message);
            return;
        }

        updateUI(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function updateUI(data) {
    document.getElementById('city-name').innerText = data.name;
    document.getElementById('temperature').innerText = `${data.main.temp}°C`;
    document.getElementById('description').innerText = data.weather[0].description;
    document.getElementById('humidity').innerText = `${data.main.humidity}%`;
    document.getElementById('wind-speed').innerText = `${data.wind.speed} m/s`;
    document.getElementById('pressure').innerText = `${data.main.pressure} hPa`;

    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('weather-icon').src = iconUrl;

    document.getElementById('date-time').innerText = new Date().toLocaleString();
    document.getElementById('weather-info').classList.add('active');
}
