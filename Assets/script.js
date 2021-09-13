var city = [];
var submitBtnEl = document.getElementById("submitBtn");
var inputValueEl = document.getElementById("cityNameInput");
var nameDateEl  = document.getElementById("nameDate");
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humidityEl = document.getElementById("humidity");
var key = b6202def895aaf2a9e59056af64e69fd;
 

var formSubmitHandler = function (e) {
    e.preventDefault();

// To trim extra spaces when searching
    var cityNameInput = inputValueEl.value.trim();
submitBtnEl.addEventListener("click", function) {
// Current Weather API
fetch("https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=b6202def895aaf2a9e59056af64e69fd")
    .then(function(resp) {
        return resp.json
    })
    .then(function(data) {
        console.log(data);
    });

    // 5-Day Weather API
    fetch("https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid=b6202def895aaf2a9e59056af64e69fd")
        .then(function(resp) {
            return resp.json
    })
    .then(function(data) {
        console.log(data);
    }
});
