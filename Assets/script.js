var city = [];
var searchInputEl = document.getElementById("cityNameInput");
var submitBtnEl = document.getElementById("submitBtn");
var currentWeather = document.getElementById("current-title");
var key ="b6202def895aaf2a9e59056af64e69fd";

function getWeather(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // console.log(data);  
        var currentTitle = document.createElement("span");
        currentTitle.innerHTML = city + " ";
        currentTitle.innerHTML +=moment().format("MM/DD/YYYY");
        currentWeather.appendChild(currentTitle);
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