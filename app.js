const searchButton = document.getElementById('search-btn');
const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const weatherForecast = document.querySelector(".forecast");
console.log(weatherForecast);
const error404 = document.querySelector(".not-found");

const APIKey = "ef76aab462cba09c2832465d36350b80";

const themeToggle = document.getElementById('theme-toggle');
const toggleLabel = document.querySelector('.toggle-label');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeToggle.checked = true;
    toggleLabel.textContent = 'Light Mode';
}

themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('light-theme');
    toggleLabel.textContent = document.body.classList.contains('light-theme') ? 'Light Mode' : 'Dark Mode';
    
    // Save theme preference
    localStorage.setItem('theme', 
        document.body.classList.contains('light-theme') ? 'light' : 'dark'
    );
});

searchButton.addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city === '') return;

    // Fetch current weather data
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod != '200') {
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                weatherForecast.classList.remove('active');
                error404.classList.add('active');
                return;
            }
            else{
                error404.classList.remove('active');
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
                weatherForecast.classList.add('active');
            }

            document.getElementById('weather-icon').src = getWeatherIcon(data.weather[0].main);
            document.getElementById('temperature').innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
            document.getElementById('description').innerHTML = data.weather[0].description;
            document.getElementById('humidity').innerHTML = `${data.main.humidity}%`;
            document.getElementById('wind-speed').innerHTML = `${data.wind.speed} Km/h`;
        });

    // Fetch 5-day forecast
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(data => {
            updateForecast(data.list);
        });
});

function updateForecast(list) {
    const forecastElements = [
        { tempId: 'forecast-temp1', iconId: 'forecast-icon1', dayId: 'day-name1' },
        { tempId: 'forecast-temp2', iconId: 'forecast-icon2', dayId: 'day-name2' },
        { tempId: 'forecast-temp3', iconId: 'forecast-icon3', dayId: 'day-name3' },
        { tempId: 'forecast-temp4', iconId: 'forecast-icon4', dayId: 'day-name4' },
        { tempId: 'forecast-temp5', iconId: 'forecast-icon5', dayId: 'day-name5' },
    ];

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date().getDay(); // Get current day as a number (0-6 for Sun-Sat)

    forecastElements.forEach((element, index) => {
        const forecastData = list[index * 8];  // 3-hour interval, so 8 entries per day

        document.getElementById(element.tempId).innerHTML = `${Math.round(forecastData.main.temp)}<span>°C</span>`;
        document.getElementById(element.iconId).src = getWeatherIcon(forecastData.weather[0].main);

        // Calculate the correct day of the week
        const dayOfWeekIndex = (today + index + 1) % 7;  // Rolling over the days of the week
        document.getElementById(element.dayId).innerHTML = daysOfWeek[dayOfWeekIndex];
    });
}

function getWeatherIcon(weather) {
    switch (weather) {
        case 'Clear':
            return 'assets/images/clear.png';
        case 'Rain':
            return 'assets/images/rain.png';
        case 'Snow':
            return 'assets/images/snow.png';
        case 'Clouds':
            return 'assets/images/cloud.png';
        case 'Mist':
        case 'Haze':
            return 'assets/images/mist.png';
        default:
            return 'assets/images/cloud.png';
    }
}
