function renderWeatherSummary(city, date, temp, humidity, windSpeed) {

var myDate = new Date(date);
var month = myDate.getMonth();
var day = myDate.getDate();

var resultsDiv = document.getElementById("results");
resultsDiv.innerHTML = `<div>${city}</div>
                        <div>DATE: ${month+1}/${day}</div>
                        <div>TEMP: ${temp}</div>
                        <div>HUMIDITY: ${humidity}</div>
                        <div>WIND SPEED: ${windSpeed}</div>`;
}

function renderFirstDayWeather(daynum, date, weatherType, temp, humitdity) {
var kelvin = temp;
var celcius = kelvin - 273;
let fahrenheit = Math.floor(celcius * (9/5) + 32);

var myDate = new Date(date);
var month = myDate.getMonth()
var day = myDate.getDate()

var resultsDiv = document.getElementById("day" + daynum);
resultsDiv.innerHTML = `<div><u>Date</u></br>${month+1}/${day}</div>
                        <div><u>Forecast</u></br>${weatherType}</div>
                        <div><u>Temp</u></br>${fahrenheit}<span id="outputFar"></span></div>
                        <div><u>Humidity</u></br>${humitdity}</div>`;
}

function renderWeatherAPIData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=6db77ab9c950eb85dfb10d4ad6446a97`)
    .then(res => { return res.json()})
    .then(handleAPIResponse);
}

function handleAPIResponse(json) {
var kelvin = json.list[0].main.temp;
var celcius = kelvin - 273;
let fahrenheit = Math.floor(celcius * (9 / 5) + 32);

    console.log(json.city.name)
    console.log("JSON", json)
    renderWeatherSummary(json.city.name, json.list[0].dt_txt, fahrenheit, json.list[0].main.humidity, json.list[0].wind.speed);
    var day = 0
    for (i = 0; i < json.cnt; i+=8) {
    console.log(json.list[i])
    renderFirstDayWeather(day, json.list[i].dt_txt, json.list[i].weather[0].description, json.list[i].main.temp, json.list[i].main.humidity);
    day++
}
}

var navLinkList = document.getElementsByClassName("nav-link");

for (i = 0; i < navLinkList.length; i++) {
    navLinkList[i].addEventListener("click", function(event) {
    console.log(event.target.innerHTML);
    renderWeatherAPIData(event.target.innerHTML);
    })
}

var searchButtonElement = document.getElementById("fetch-button");

searchButtonElement.addEventListener("click", function() {
    console.log(document.getElementById("search-box").value);
    renderWeatherAPIData(document.getElementById("search-box").value);
})