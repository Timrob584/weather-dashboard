var city = [];
var searchInputEl = document.getElementById("cityNameInput");
var submitBtnEl = document.getElementById("submitBtn");
var currentWeather = document.getElementById("current-title");
var key ="b6202def895aaf2a9e59056af64e69fd";

function getWeather(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + key)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        var currentTitle = document.createElement("span");
        currentTitle.innerHTML = city + " ";
        currentTitle.innerHTML +=moment().format("MM/DD/YYYY");
        currentWeather.appendChild(currentTitle);
        })

        var weatherIcon = document.createElement("img");
        weatherIcon.setAttribute("class", "weather-icon");

        // weatherIcon.src ="https://openweathermap.org/img/wn/" + data.weather["0"].icon + "@2x.png";
        // currentTitle.appendChild(weatherIcon);

        var tempEl = document.createElement("p");
        tempEl.innerHTML = "Temp:" + data.main.temp + " °F";
}
// To prevent default behavior on-click
function formSubmit(e) {
    e.preventDefault();
    var citySearch = searchInputEl.value.trim();
    getWeather(citySearch);
    searchInputEl.value="";
}

submitBtnEl.addEventListener("click", formSubmit);
