const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const details = document.querySelector('.weather-details');
const error = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIkey = 'd6835d1083f3649eb4b02716f9e16c1e';
    const city = document.querySelector('.search-box input').value;

    if(city =='') return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`).then(res => res.json()).then(json => {
        if(json.cod == '404') {
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            details.classList.remove('active');
            error.classList.add('active');
            return;
        }
        container.style.height = '555px';
        weatherBox.classList.add('active');
        details.classList.add('active');
        error.classList.remove('active');

        const image = document.querySelector('.weather-box img');
        const temp = document.querySelector('.weather-box .temp');
        const desp = document.querySelector('.weather-box .desp');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = `sun.png`;
                break;
            case 'Rain':
                image.src = `rain.png`;
                break;
            case 'Snow':
                    image.src = `snow.png`;
                    break;
            case 'Clouds':
                image.src = `cloud.png`;
                break; 
            case 'Mist':
                    image.src = `wind.png`;
                    break;           
            default:
                image.src = `cloud.png`;
                break;
        }
        temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        desp.innerHTML = `${json.weather[0].desp}`;
        humidity.innerHTML = `${json.main.humidity}`;
        wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;
    })
})