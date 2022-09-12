
var searchBtn = document.querySelector('.search-btn');
var searchHistory = document.querySelector('.search-history');
var currentWeather = document.querySelector('.current-weather');
var futureWeather = document.querySelector('.future-weather.row');
var locationDate = document.querySelector('.location-date');
var currentTemp = document.querySelector('.current-temp');
var currentWind = document.querySelector('.current-wind');
var currentHumidity = document.querySelector('.current-humidity');
var currentUV = document.querySelector('.current-UV');
var weatherIcon = document.querySelector('.weather-icon');
var myKey = config.MY_KEY;

var cityInput = '';
var city = '';
var totalHistory = [];
var latitude;
var longitude;
var place;
var iconVal;
var iconUrl;
var coord = [];

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
            locationDate.textContent = `${moment().format('dddd MM/DD/YY')} --- ${place}`;
                weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${iconVal}@2x.png`);
            currentTemp.textContent = `Temp: ${data.current.temp} `;
            currentWind.textContent = `Wind: ${data.current.wind_speed}`;
            currentHumidity.textContent = `Humidity: ${data.current.humidity}`;
            currentUV.textContent = `UV: ${data.current.uvi}`;

            futureWeather.innerHTML = data.daily.map((day, index) => {
                if (index < 5){
                    return '<p> hello </p>';
                }
            }).join(' ')

        })
   
            
        
        
    
}


function updateHistory () {
   var fromStorage = JSON.parse(localStorage.getItem('location'));
   var index = fromStorage.length - 1
   var historyItems = document.createElement('li');
   historyItems.setAttribute('class', 'history-items');
   var historyBtn = document.createElement('button');
   historyBtn.setAttribute('class', 'btn btn-secondary')
    historyBtn.textContent = `${fromStorage[index]}`;
    historyItems.appendChild(historyBtn);
    searchHistory.appendChild(historyItems);
}


searchBtn.addEventListener('click', () => {
    cityInput = document.getElementById('city-input').value;
    totalHistory.push(cityInput);
    localStorage.setItem('location', JSON.stringify(totalHistory));
    updateHistory();
    city = cityInput.replace(' ', '+');
    getCoord();
    document.getElementById('city-input').value = '';
});