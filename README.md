# weather-dash

## About the Project
This weather dashboard (styled by Bootstrap CSS Framework) allows users to input a city into the search field and will present current and future weather conditions for that city on the webpage. That city is then displayed on the search history, which can be clicked on to get weather information on that city once more. 
Since the weather API only takes in latitude and longitude for their parameters, the coordinates for the city is retrieved from a Geocoding API provided by OpenWeather. The weather information is then recieved from OneCall API, also from OpenWeather.

## Building the Weather Dashboard
The entirety of this project was created from scratch to meet the following requirements:

- When the user searches a for a city, the page presents with current and future conditions for that city and that city is added to the search history

- When viewing the current weather contidtions for that city, the user is presented with 
    - city name
    - the date
    - an icon representation of weather condition
    - the temperature, the humidity
    - the wind speed
    - the UV index (has a color that indicates whether the conditions are favorable, moderate, or severe)

- When viewing the future weather conditions for that city, the user is presented with a 5-day forecast that displays 
    - the date
    - an icon representation of weather conditions
    - the temperature
    - the wind speed
    - the humidity

- When a city in the search history is clicked, the user is again presented with current and future conditions for that city

## Applied Skills
- Using Bootstrap CSS Framework for the majority of the styling

- DOM manipulation to target specific classes, creating elements, setting their attributes, appending the new elements on the page, and modifying the text content.

- Practice using moment.js to display the current date

- Using fetch to retrieve information from an API and then handling the reponse and data

- Getting data from one API to use in a separate API

- Using .map() to loop through an object and returning a card that has specific information pulled from the object and then .join() the cards together to be displayed on the page

- Storing the searched cities into the user's local storage and then getting that value from the local storage to be displayed in the search history container. Used JSON.stringify and JSON.parse to put items and pull items out of the local storage respectively.

- Using event listeners on the search button and also on cities displayed in the search history so that when the user clicks on those buttons, the correct weather info gets populated.

## Deployed Project
https://vivianc11.github.io/weather-dash/

![image of weather dashboard](./Assets/Screen%20Shot%202022-09-13%20at%203.32.06%20PM.png)

### Resources
https://momentjs.com/
https://www.youtube.com/watch?v=nGVoHEZojiQ&ab_channel=SteveGriffith-Prof3ssorSt3v3
https://openweathermap.org/api
https://getbootstrap.com/