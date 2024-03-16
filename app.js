const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const weatherForcast = document.querySelector(".forcast");
const error404 = document.querySelector(".not-found");

search.addEventListener('click', () => {

    const APIKey = "ef76aab462cba09c2832465d36350b80";
    const city = document.querySelector('.search-box input').value;
    console.log(city);

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        if (json.cod == '404') {
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherForcast.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherForcast.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        console.log(json);
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
    
        switch (json.weather[0].main){
            case 'Clear':
                image.src = 'assets/images/clear.png';
                break;

            case 'Rain':
                image.src = 'assets/images/rain.png';
                break;

            case 'Snow':
                image.src = 'assets/images/snow.png';
                break;

            case 'Clouds':
                image.src = 'assets/images/cloud.png';
                break;

            case 'Mist':
                image.src = 'assets/images/mist.png';
                break;
            
            case 'Haze':
                image.src = 'assets/images/mist.png';
                break;
            
            default:
                image.src = 'assets/images/cloud.png';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${parseInt(json.main.humidity)}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    });

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
        console.log(json);

        const day1 = document.querySelector('.forcast day-p');
        const day2 = document.querySelector('.forcast day-p');
        const day3 = document.querySelector('.forcast day-p');
        const day4 = document.querySelector('.forcast day-p');
        const day5 = document.querySelector('.forcast day-p');
        const imageForcast1 = document.querySelector('.forcast img');
        const imageForcast2 = document.querySelector('.forcast img');
        const imageForcast3 = document.querySelector('.forcast img');
        const imageForcast4 = document.querySelector('.forcast img');
        const imageForcast5 = document.querySelector('.forcast img');
        const temperatureForcast1 = document.querySelector('.forcast .temperature1');
        const temperatureForcast2 = document.querySelector('.forcast .temperature2');
        const temperatureForcast3 = document.querySelector('.forcast .temperature3');
        const temperatureForcast4 = document.querySelector('.forcast .temperature4');
        const temperatureForcast5 = document.querySelector('.forcast .temperature5');

        temperatureForcast1.innerHTML = `${parseInt(json.list[7].main.temp)}<span>°C</span>`;
        temperatureForcast2.innerHTML = `${parseInt(json.list[15].main.temp)}<span>°C</span>`;
        temperatureForcast3.innerHTML = `${parseInt(json.list[23].main.temp)}<span>°C</span>`;
        temperatureForcast4.innerHTML = `${parseInt(json.list[31].main.temp)}<span>°C</span>`;
        temperatureForcast5.innerHTML = `${parseInt(json.list[39].main.temp)}<span>°C</span>`;


        



    });
});



7, 15, 23, 31, 39