const city = [];
const searchInputEl = document.getElementById("cityNameInput");
const submitBtnEl = document.getElementById("submitBtn");
const currentWeather = document.getElementById("current-title");
const temp = document.getElementById("temp");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const uv = document.getElementById("uv");
const key = "b6202def895aaf2a9e59056af64e69fd";

function getWeather(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + key)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            let tempEl = document.createElement("p");
            tempEl.innerHTML = "Temperature: " + Math.round(data.main.temp) + " °F";
            temp.appendChild(tempEl);

            let windEl = document.createElement("p");
            windEl.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";
            wind.appendChild(windEl);

            let humidityEl = document.createElement("p");
            humidityEl.innerHTML = "Humidity: " + data.main.humidity + "%";
            humidity.appendChild(humidityEl);

            let currentTitle = document.createElement("span");
            currentTitle.innerHTML = city + " ";
            currentTitle.innerHTML += moment().format("MM/DD/YYYY");
            currentWeather.appendChild(currentTitle);

            let weatherIcon = document.createElement("img");
            weatherIcon.setAttribute("class", "weather-icon");
            weatherIcon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
            currentTitle.appendChild(weatherIcon);

            const lat = data.coord.lat
            const lon = data.coord.lon
            getUvIndex(lat, lon, city)
        })

    function getUvIndex(lat, lon, city) {
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=&exclude=hourly,minutely,alerts&appid=" + key)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                uvIndex = data.current.uvi;

                let uvIndexEl = document.createElement("div");
                uvIndexEl.innerHTML += "UV Index: ";

                let uvIndexBtn = document.createElement("button");
                uvIndexBtn.innerHTML = uvIndex;

                uvIndexEl.appendChild(uvIndexBtn);
                uv.appendChild(uvIndexEl);


                if (uvIndex <= 3) {
                    uvIndexBtn.setAttribute("class", "btn-success col-1")
                } else if (uvIndex > 3 && uvIndex <= 8) {
                    uvIndexBtn.setAttribute("class", "btn-warning col-1")
                } else (uvIndex > 8)
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
                    let forecastEl = document.querySelectorAll(".forecast");
                    for (i = 0; i < forecastEl.length; i++) {
                        forecastEl[i].innerHTML = "";
                        let forecastIndex = i * 8 + 4;
                        let forecastDate = new Date(data.list[forecastIndex].dt * 1000);
                        let forecastDay = forecastDate.getDate();
                        let forecastMonth = forecastDate.getMonth() + 1;
                        let forecastYear = forecastDate.getFullYear();
                        let forecastDateEl = document.createElement("p");
                        forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                        forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                        forecastEl[i].append(forecastDateEl);
                        let forecastWeatherEl = document.createElement("img");
                        forecastWeatherEl.setAttribute("class", "weather-icon");
                        forecastWeatherEl.src = "https://openweathermap.org/img/wn/" + data.list[forecastIndex].weather[0].icon + "@2x.png";
                        forecastEl[i].appendChild(forecastWeatherEl);

                        let forecastTempEl = document.createElement("p");
                        forecastTempEl.innerHTML = "Temperature: " + Math.round(data.list[forecastIndex].main.temp) + " °F";
                        forecastEl[i].appendChild(forecastTempEl);

                        let forecastHumidityEl = document.createElement("p");
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
    const citySearch = searchInputEl.value.trim();
    getWeather(citySearch);
    searchInputEl.value = "";
}

submitBtnEl.addEventListener("click", formSubmit);