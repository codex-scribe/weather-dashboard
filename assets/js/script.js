var searchButtonEl = $("#go");
var cityEl = $('#city-search');
//var locationUrl = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=25aec6e1a5f4bd4d4c5e2b4868c2e0e3'
var requestUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid=25aec6e1a5f4bd4d4c5e2b4868c2e0e3'

$(searchButtonEl).on("click", getLocation);

function getLocation (event) {
    event.preventDefault();
    var location = cityEl.val();
    console.log(location);
    var locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=25aec6e1a5f4bd4d4c5e2b4868c2e0e3`;
    fetch(locationUrl).then(function(response) {
        return response.json();}
    ).then(function(data) {
        var coords = {
        lat: data[0].lat,
        lon: data[0].lon
        }
        console.log(coords);
        cityEl.val('');
        getWeather(coords);
        }
    )
}

function getWeather(coords) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=25aec6e1a5f4bd4d4c5e2b4868c2e0e3`
    fetch(requestUrl).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        
    })
}