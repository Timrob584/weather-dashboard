var city = [];
var searchInputEl = document.getElementById("cityNameInput");
var submitBtnEl = document.getElementById("submitBtn");
var currentWeather = document.getElementById("current-title");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var uv = document.getElementById("uv");
var key ="b6202def895aaf2a9e59056af64e69fd";

function getWeather(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + key)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
    
        var tempEl = document.createElement("p");
        tempEl.innerHTML = "Temperature: " + Math.round(data.main.temp) + " °F";
        temp.appendChild(tempEl);

        var windEl = document.createElement("p");
        windEl.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";
        wind.appendChild(windEl);

        var humidityEl = document.createElement("p");
        humidityEl.innerHTML = "Humidity: " + data.main.humidity + "%";
        humidity.appendChild(humidityEl);
  
        var currentTitle = document.createElement("span");
        currentTitle.innerHTML = city + " ";
        currentTitle.innerHTML +=moment().format("MM/DD/YYYY");
        currentWeather.appendChild(currentTitle);
            
        var weatherIcon = document.createElement("img");
        weatherIcon.setAttribute("class", "weather-icon");
        weatherIcon.src ="https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
        currentTitle.appendChild(weatherIcon);

    })


        
}
// To prevent default behavior on-click
function formSubmit(e) {
    e.preventDefault();
    var citySearch = searchInputEl.value.trim();
    getWeather(citySearch);
    searchInputEl.value="";
}

submitBtnEl.addEventListener("click", formSubmit);
