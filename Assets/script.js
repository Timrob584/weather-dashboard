var city = [];
var savedSearches = JSON.parse(localStorage.getItem("allEntries")) || [];
var submitBtnEl = document.getElementById("submitBtn");
var inputValueEl = document.getElementById("cityNameInput");
var nameDateEl  = document.getElementById("nameDate");
var currentEl = document.querySelector("current-card");
var forecastHeaderEl = document.getElementById("forecast-header");
var cityBtnEl = document.getElementById("city-buttons");
var namedateSpanEl = document.getElementById("nameDateSpan");
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humidityEl = document.getElementById("humidity");
var uvIndexValue = document.getElementById("uvIndex");
var key = b6202def895aaf2a9e59056af64e69fd;
 

// Current Weather API
function getWeather(city) {
    currentEl.innerHTML = "";

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key)
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            namedateSpanEl.innerHTML = city
            namedateSpanEl.innerHTML += " (" + moment().format("l") + ")"
        })

    // To add weather icon
    var weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("class", "weather-icon")
    weatherIcon.src = "https://openweathermap.org/img/wn/" + data.weather["0"].icon + "@2x.png";
    namedateSpanEl.appendChild(weatherIcon);

// To add current data from the api
    tempEl.appendChild(data.main.temp + " °F");
    windEl.appendChild(data.wind.speed + " MPH");
    humidityEl.appendChild(data.main.humidity + " %");

// To get latitude and longitude for uv index
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    getUVIndex(lat, lon, city);

};

function getUVIndex(lat, lon, city) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely,alerts&appid=" + key)
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            uvIndex = data.current.uvi
        
            let UVIndexEl = document.createElement("span");
            uvIndexEl.innerHTML = uvIndex;
            uvIndexValue.appendChild(UVIndexEl);
        
            if(uvIndex.value <=2){
                uvIndexEl.setAttribute("class", "favorable")
            } else if(uvIndex.value >2 && index.value<=8){
                uvIndexEl.setAttribute("class", "moderate")
            } else if(uvIndex.value >8){
                uvIndexEl.setAttribute("class", "severe")
            };
        })
};

    // 5-Day Weather API
    let cityID = response.data.id;
    fetch("https://api.openweathermap.org/data/2.5/forecast?q" + cityID + "&appid=" + key)
        .then(function(resp) {
            var forecastEl = document.querySelectorAll(".forecast");
            for (i = 0; i < forecastEl.length; i++) {
                forecastEl[i].innerHTML = "";
                var forecastIndex = i * 8 + 4;
                var forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                var forecastDay = forecastDate.getDate();
                var forecastMonth = forecastDate.getMonth() + 1;
                var forecastYear = forecastDate.getFullYear();
                var forecastDateEl = document.createElement("p");
                forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                forecastEl[i].append(forecastDateEl);

                var forecastTempEl = document.createElement("p");
                forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
                forecastEl[i].append(forecastTempEl);

                var forecastHumidityEl = document.createElement("p");
                forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                forecastEl[i].append(forecastHumidityEl);
    };

    function k2f(K) {
        return Math.floor((K - 273.15) * 1.8 + 32);
    }

   saveCity(city);

//    Loop to create buttons for searched cities
   for (i = 0; i < savedSearches.length; i++) {
    city[i] = document.createElement("button")
    city[i].innerHTML = savedSearches[i]
    city[i].setAttribute("class", "btn")
    // // existingCity[i].setAttribute('box-sizing', 'border-box')
    // city[i].setAttribute('data-searchterm', savedSearches[i])
    cityBtnEl.appendChild(city[i])
}

// To  push new search entries into local storage and create buttons for them
function saveCity(city) {
      if (!savedSearches.includes(city)) { 
          savedSearches.push(city)
          localStorage.setItem("allEntries", JSON.stringify(savedSearches));
          var newCityBtn = document.createElement("button")
          newCityBtn.setAttribute("class","btn")
          newCityBtn.innerHTML = city
          cityBtnEl.appendChild(newCityBtn)
      }
  };

  var formSubmitHandler = function (e) {
    if(!inputValueEl.value) {
        return;
    }
    e.preventDefault();
    var cityNameInput = inputValueEl.value.trim();
    getWeather(cityNameInput);
    inputValueEl.value = "";


function handleHistorySearch(e) {
    if (e.target.matches(".city-buttons")) {
        var btn = e.target;
        var cityNameInput = btn.getAttribute("data-searchterm");
        getApi(cityNameInput);
    }
}
submitBtnEl.addEventListener("click", handleFormSubmit);
cityBtnEl.addEventListener("click", handleHistorySearch);