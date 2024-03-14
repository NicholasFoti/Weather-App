const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const weatherForcast = document.querySelector(".forcast");
const error404 = document.querySelector(".not-found");

search.addEventListener('click', () => {

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

        const day = document.querySelector('.forcast h2');
        const imageForcast = document.querySelector('.forcast img');
        const temperatureForcast = document.querySelector('.forcast .temperature');


        



    });
});



7, 15, 23, 31, 39