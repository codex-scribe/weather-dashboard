var searchButtonEl = $("#go");
var cityEl = $("#city-search");
var fiveDayEl = $("#fiveDay");
var pastSearchesArea = $("#pastSearches");
//var locationUrl = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=25aec6e1a5f4bd4d4c5e2b4868c2e0e3'
//var requestUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid=25aec6e1a5f4bd4d4c5e2b4868c2e0e3'

$(searchButtonEl).on("click", getLocation);

function getLocation(event) {
  event.preventDefault();
  var location = cityEl.val();
  var locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=25aec6e1a5f4bd4d4c5e2b4868c2e0e3`;
  fetch(locationUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var coords = {
        lat: data[0].lat,
        lon: data[0].lon,
      };
      cityEl.val("");
      getWeather(coords);
    });
}

function getWeather(coords) {
  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&units=imperial&appid=25aec6e1a5f4bd4d4c5e2b4868c2e0e3`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      fiveDayEl.html('');
      $("#cityName").text(`${data.city.name}`);
      $("#cityTemp").text(`${data.list[0].main.temp}`);
      $("#cityWind").text(`${data.list[0].wind.speed}`);
      $("#cityHumidity").text(`${data.list[0].main.humidity}`);
      var pastSearchEls = pastSearchesArea.children();
      for (var i = 0; i < pastSearchEls.length; i++) {
        if (i<pastSearchEls.length-1 && pastSearchEls[i].text() !== data.city.name) {
          continue
        } else if (i<pastSearchEls.length && pastSearchEls[i].text() == data.city.name) {
          break
        } else {
          var pastSearch = $("<p>");
          pastSearch.addClass("pastsearch");
          pastSearch.text(`${data.city.name}`);
          pastSearchesArea.append(pastSearch);
        }
      }
      
      for (var i = 8; i < 41; i += 8) {
        console.log(i);
        var newCard = $("<div>");
        newCard.addClass("col");
        var dayInfo = data.list[i];
        newCard.html(`
            <h3>${dayjs.unix(dayInfo.dt).format("M/D")}</h3>
            <p>Temp: ${dayInfo.main.temp}°F</p>
            <p>Wind: ${dayInfo.wind.speed} mph</p>
            <p>Humidity: ${dayInfo.main.humidity}%</p>
            `);
        fiveDayEl.append(newCard);
      }
    });
}
