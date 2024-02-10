const apiKey = '5323e329831f1f3276aa230600d24eee';

function getWeather() {
    const city = document.getElementById('cityInput').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (response.status === 401) {
                throw new Error('Unauthorized');
            }
            return response.json();
        })
        .then(data => updateWeatherDetails(data))
        .catch(error => {
            if (error.message === 'Unauthorized') {
                alert('Unauthorized: Invalid API key');
            } else {
                alert('An error occurred: ' + error);
            }
        });
    
    
    localStorage.setItem('lastCity', city);
}

function updateWeatherDetails(data) {
    const weather = document.getElementById('weatherDetails');
    if (data.cod === 200) {
        weather.innerHTML = `<h2>Pogoda dla: ${data.name}</h2>
                             <p>Temperatura: ${data.main.temp}°C</p>
                             <p>Wilgotność: ${data.main.humidity}%</p>
                             <p>Warunki: ${data.weather[0].description}</p>`;
    } else {
        weather.innerHTML = `<p>Nie znaleziono informacji o pogodzie dla podanego miasta.</p>`;
    }
}


function loadLastCity() {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
        document.getElementById('cityInput').value = lastCity;
        getWeather();
    }
}

window.onload = loadLastCity;
