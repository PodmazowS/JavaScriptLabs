const apiKey = '5323e329831f1f3276aa230600d24eee';

function getWeather(city) {
    if (!city) return; // Jeśli miasto nie jest podane, zakończ funkcję

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                // Aktualizacja interfejsu z danymi pogodowymi
                const weatherList = document.getElementById('weatherList');
                const listItem = document.createElement('li');
                listItem.innerHTML = `<h3>${data.name}</h3>
                                      <p>Temperatura: ${data.main.temp}°C</p>
                                      <p>Wilgotność: ${data.main.humidity}%</p>
                                      <p>Warunki: ${data.weather[0].description}</p>
                                      <button onclick="removeCity('${data.name}')">Usuń</button>`;
                weatherList.appendChild(listItem);
                
                // Dodaj miasto do localStorage
                addCityToStorage(data.name);
            } else {
                alert("Nie znaleziono miasta.");
            }
        })
        .catch(error => console.error("Błąd: ", error));
}

// Funkcja do dodawania miasta do localStorage
function addCityToStorage(city) {
    let cities = JSON.parse(localStorage.getItem('cities')) || [];
    if (cities.length < 10) {
        cities.push(city);
        localStorage.setItem('cities', JSON.stringify(cities));
    } else {
        alert("Możesz dodać maksymalnie 10 miejsc.");
    }
}

// Funkcja do usuwania miasta z listy i localStorage
function removeCity(city) {
    let cities = JSON.parse(localStorage.getItem('cities')) || [];
    cities = cities.filter(c => c !== city);
    localStorage.setItem('cities', JSON.stringify(cities));
    loadCities(); // Odśwież listę miast
}

// Funkcja do ładowania miast z localStorage i wyświetlania ich na liście
function loadCities() {
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    const weatherList = document.getElementById('weatherList');
    weatherList.innerHTML = ''; // Wyczyść listę przed ponownym załadowaniem
    cities.forEach(city => getWeather(city));
}

// Dodaj obsługę zdarzenia dla formularza dodawania miasta
document.getElementById('addCityForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const cityInput = document.getElementById('cityInput');
    getWeather(cityInput.value);
    cityInput.value = ''; // Wyczyść pole po dodaniu miasta
});

// Załaduj miasta przy starcie aplikacji
window.onload = loadCities;