// Targeting classes set in HTML
var searchBtn = document.querySelector('.search-btn');
var searchHistory = document.querySelector('.search-history');
var currentDate = document.querySelector('.current-date');
var currentWeather = document.querySelector('.current-weather');
var futureWeather = document.querySelector('.future-weather');
var locationDate = document.querySelector('.location-date');
var currentTemp = document.querySelector('.current-temp');
var currentWind = document.querySelector('.current-wind');
var currentHumidity = document.querySelector('.current-humidity');
var currentUV = document.querySelector('.current-UV');
var weatherIcon = document.querySelector('.weather-icon');
var myKey = 'f0877b3282711bd2ec8d3b92f3042057';

// Creating an element and setting attribute
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

// Displaying the current date
currentDate.textContent = moment().format('dddd, MM/DD/YY');

// Function to get the latitude and longitude from an entered city
function getCoord() {
    var requestLocation = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${myKey}`

    fetch(requestLocation)
    .then(function (response) {
        if (response){
            return response.json();
        } else {
            console.log("err")
        }   
    })
    .then(function (data) {
        latitude = data[0].lat;
        longitude = data[0].lon;
        place = data[0].name;
        // Executing getWeather function
        getWeather(latitude, longitude, place);
    })  
}

// Function to use values from getCoord function to get weather information
function getWeather(latitude, longitude, place) {
    
    var requestUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=${myKey}`;

    fetch(requestUrl)
        .then(function (response) {
            if (response) {
                return response.json();
            } else {
                console.log(err);
            }
        })
        .then(function (data) {
            // Getting the weather icon value and placing it into the URL to get the associated icon
            iconVal = data.current.weather[0].icon;
                weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${iconVal}@4x.png`);
            
            // Displaying weather info
            locationDate.textContent = place;
            currentTemp.textContent = `Temp: ${data.current.temp}`
            currentWind.textContent = `Wind: ${data.current.wind_speed} mph`;
            currentHumidity.textContent = `Humidity: ${data.current.humidity}`;
            currentUV.textContent = data.current.uvi;
            // Background colors associted with the UV index
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
            // Displaying 5 cards to display future weather info
            // Using .map to loop through the object
            futureWeather.innerHTML = data.daily.map((day, index) => {
                if (index < 5){
                    timeStamp = day.dt * 1000; // Multiplying the timestamp by 1000 converts it so JS can read it appropriately
                    forcastDate = new Date(timeStamp).toString(); // Converting to string type so then it can be sliced
                    forcastDate = forcastDate.slice(4, 15); // Slicing because only part of the date is needed
                    
                    return `<div class="weather-card card border-dark m-1 col-md-2 col-sm-12" style="max-width: 30rem;">
                    <div class="card-header">${forcastDate}</div>
                    <div class="card-body text-dark">
                      <img class="img-fluid rounded" src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon">
                      <p class="card-text">Temp: ${day.temp.day}</p>
                      <p class="card-text">Wind: ${day.wind_speed} mph</p>
                      <p class="card-text">Humidity: ${day.humidity}</p>
                    </div>
                    </div>`;
                }
            }).join(' ') // Joining the cards together with a space in between
        })  
}

// Function to update the search history
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

// Function to load the search history if there is already locations saved
function loadHistory () {
    if (localStorage !== null){
        var fromStorage = JSON.parse(localStorage.getItem('location'));
        for(var i=0; i < fromStorage.length; i++ ){
            var historyItems = document.createElement('li');
            historyItems.setAttribute('class', 'history-items d-grid gap-2');
            historyBtn = document.createElement('button');
            historyBtn.setAttribute('class', 'btn btn-secondary mb-1');
            historyBtn.textContent = `${fromStorage[i]}`;
            historyItems.appendChild(historyBtn);
            searchHistory.appendChild(historyItems);
        }
    }
}

// What happens when the search button is clicked
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

// What happens when a city under the search history is clicked
searchHistory.addEventListener('click', (event) => {
    city = event.target.textContent;
    getCoord();
})    

// If there is a location saved in the localStorage, it will be displayed when the page loads/refreshes
loadHistory();