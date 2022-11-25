function fetchData(city) {
  const geoRequest = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=e942fee8ce99d54e6ce8e15ee38866d4`;
  fetch(geoRequest)
    .then(function (response) {
      return response.json();
    })
    .then(function(response){
      fetchWeather(response[0].lat, response[0].lon)})
    .catch(function (err) {
      alert("Unknown city");
    });
}

function fetchWeather(lat, lon){
  const weatherRequest = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e942fee8ce99d54e6ce8e15ee38866d4`;
  fetch(weatherRequest,{ mode: "cors" })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      renderContent(response);
    })
    .catch(function (err) {
      alert("Sorry, an error just ocurred");
    });
}

function renderContent(weather){
  const innerHTML = `<p>${weather.name}</p>`;
  document.body.innerHTML = innerHTML;
}

fetchData('Berlin');
