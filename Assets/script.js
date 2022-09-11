
var searchBtn = document.querySelector('.search-btn');
var searchHistory = document.querySelector('.search-history');
var currentWeather = document.querySelector('.current-weather');

var cityInput = '';
var city = '';
var totalHistory = [];

function getApi() {
    
    var key = '4abc8c70dcf4f12fe36bd4405f379549';
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;


    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
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
    getApi();
    document.getElementById('city-input').value = '';
});