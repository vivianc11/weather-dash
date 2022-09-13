
var searchBtn = document.querySelector('.search-btn');
var searchHistory = document.querySelector('.search-history');
var currentDate = document.querySelector('.current-date');
var currentWeather = document.querySelector('.current-weather');
var futureWeather = document.querySelector('.future-weather.row');
var locationDate = document.querySelector('.location-date');
var currentTemp = document.querySelector('.current-temp');
var currentWind = document.querySelector('.current-wind');
var currentHumidity = document.querySelector('.current-humidity');
var currentUV = document.querySelector('.current-UV');
var weatherIcon = document.querySelector('.weather-icon');
var myKey = config.MY_KEY;
var historyBtn = document.createElement('button');
    historyBtn.setAttribute('class', 'btn btn-secondary');

var cityInput = '';
var city = '';
var totalHistory = [];
var latitude;
var longitude;
var place;
var iconVal;
var iconUrl;
var coord = [];
var timeStamp;
var forcastDate;


currentDate.textContent = moment().format('dddd, MM/DD/YY');

function getCoord() {
    var requestLocation = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${myKey}`

    fetch(requestLocation)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        latitude = data[0].lat;
        longitude = data[0].lon;
        place = data[0].name;
        getWeather(latitude, longitude, place);
    })  
}

function getWeather(latitude, longitude, place) {
    
    var requestUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=${myKey}`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            iconVal = data.current.weather[0].icon;
            locationDate.textContent = place;
                weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${iconVal}@4x.png`);
            currentTemp.textContent = `Temp: ${data.current.temp}`
            currentWind.textContent = `Wind: ${data.current.wind_speed} mph`;
            currentHumidity.textContent = `Humidity: ${data.current.humidity}`;
            currentUV.textContent = data.current.uvi;
            if (data.current.uvi > 10) {
                currentUV.style.backgroundColor = "pink";
                currentUV.style.color = "white";
            } else if (data.current.uvi > 7) {
                currentUV.style.backgroundColor = "red";
                currentUV.style.color = "white";
            } else if (data.current.uvi > 5) {
                currentUV.style.backgroundColor = "orange";
                currentUV.style.color = "black";
            } else if (data.current.uvi > 2) {
                currentUV.style.backgroundColor = "yellow";
                currentUV.style.color = "black";
            } else {
                currentUV.style.backgroundColor = "green";
                currentUV.style.color = "white";
            }

            futureWeather.innerHTML = data.daily.map((day, index) => {
                if (index < 5){
                    timeStamp = day.dt * 1000;
                    forcastDate = new Date(timeStamp).toString();
                    forcastDate = forcastDate.slice(4, 15);
                    
                    return `<div class="weather-card card border-dark m-1 col-md-2 col-sm-12" style="max-width: 30rem;">
                    <div class="card-header">${forcastDate}</div>
                    <div class="card-body text-dark">
                      <img class="img-fluid" src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon">
                      <p class="card-text">Temp: ${day.temp.day}</p>
                      <p class="card-text">Wind: ${day.wind_speed} mph</p>
                      <p class="card-text">Humidity: ${day.humidity}</p>
                    </div>
                    </div>`;
                }
            }).join(' ')
        })  
}


function updateHistory () {
   var fromStorage = JSON.parse(localStorage.getItem('location'));
   var index = fromStorage.length - 1
   var historyItems = document.createElement('li');
   historyItems.setAttribute('class', 'history-items d-grid gap-2');
   historyBtn = document.createElement('button');
    historyBtn.setAttribute('class', 'btn btn-secondary');
   historyBtn.textContent = `${fromStorage[index]}`;
   historyItems.appendChild(historyBtn);
   searchHistory.appendChild(historyItems);
}

function loadHistory () {
    if (localStorage !== null){
        var fromStorage = JSON.parse(localStorage.getItem('location'));
        for(var i=0; i < fromStorage.length; i++ ){
            var historyItems = document.createElement('li');
            historyItems.setAttribute('class', 'history-items d-grid gap-2');
            historyBtn = document.createElement('button');
            historyBtn.setAttribute('class', 'btn btn-secondary');
            historyBtn.textContent = `${fromStorage[i]}`;
            historyItems.appendChild(historyBtn);
            searchHistory.appendChild(historyItems);
        }
    }
}


searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    cityInput = document.getElementById('city-input').value.trim();
    totalHistory.push(cityInput);
    localStorage.setItem('location', JSON.stringify(totalHistory));
    updateHistory();
    city = cityInput.replace(' ', '+');
    getCoord();
    document.getElementById('city-input').value = '';
})


searchHistory.addEventListener('click', (event) => {
    city = event.target.textContent;
    getCoord();
})    

loadHistory();