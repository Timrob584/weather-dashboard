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
            console.log(data);
    
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

        var lat = data.coord.lat
        var lon = data.coord.lon
        getUvIndex(lat,lon, city)
    })

function getUvIndex(lat, lon, city) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=&exclude=hourly,minutely,alerts&appid=" + key)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        uvIndex = data.current.uvi;

        var uvIndexEl = document.createElement("div");
        uvIndexEl.innerHTML += "UV Index: ";

        var uvIndexBtn = document.createElement("button");
        uvIndexBtn.innerHTML = uvIndex;
            
        uvIndexEl.appendChild(uvIndexBtn);
        uv.appendChild(uvIndexEl);
    

        if (uvIndex <=3) {
            uvIndexBtn.setAttribute("class", "btn-success col-1")
        } else if (uvIndex >3 && uvIndex <=8) {
            uvIndexBtn.setAttribute("class", "btn-warning col-1")
        } else (uvIndex >8) 
            uvIndexBtn.setAttribute("class", "btn-danger col-1")
        getForecast(city)
    })
function getForecast(city) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&appid=" + key)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var forecastEl = document.querySelectorAll(".forecast");
        for (i=0; i<forecastEl.length; i++) {
            forecastEl[i].innerHTML = "";
            var forecastIndex = i*8 + 4;
            var forecastDate = new Date(data.list[forecastIndex].dt * 1000);
            var forecastDay = forecastDate.getDate();
            var forecastMonth = forecastDate.getMonth() + 1;
            var forecastYear = forecastDate.getFullYear();
            var forecastDateEl = document.createElement("p");
            forecastDateEl.setAttribute("class","mt-3 mb-0 forecast-date");
            forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
            forecastEl[i].append(forecastDateEl);
            var forecastWeatherEl = document.createElement("img");
            forecastWeatherEl.setAttribute("class", "weather-icon");
            forecastWeatherEl.src = "https://openweathermap.org/img/wn/" + data.list[forecastIndex].weather[0].icon + "@2x.png";
            forecastEl[i].appendChild(forecastWeatherEl);
            
            var forecastTempEl = document.createElement("p");
            forecastTempEl.innerHTML = "Temperature: " + Math.round(data.list[forecastIndex].main.temp) + " °F";
            forecastEl[i].appendChild(forecastTempEl);

            var forecastHumidityEl = document.createElement("p");
            forecastHumidityEl.innerHTML = "Humidity: " + data.list[forecastIndex].main.humidity + "%";
            forecastEl[i].appendChild(forecastHumidityEl);
        }
    })
}
       
}
    };
// To prevent default behavior on-click
function formSubmit(e) {
    e.preventDefault();
    var citySearch = searchInputEl.value.trim();
    getWeather(citySearch);
    searchInputEl.value="";
}

submitBtnEl.addEventListener("click", formSubmit);
