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
  const weatherRequest = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=e942fee8ce99d54e6ce8e15ee38866d4`;
  fetch(weatherRequest,{ mode: "cors" })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      renderContent(response);
      console.dir(response);
    })
    .catch(function (err) {
      alert("Sorry, an error just ocurred");
    });
}

function renderContent(weather){
  const innerHTML = `<p>${weather.sys.country}</p>
                    <p>${weather.name}</p>
                    <p>latitude: ${weather.coord.lat}</p>
                    <p>longitude: ${weather.coord.lon}</p>
                    <p>${weather.weather[0].description}</p>
                    <img alt='weather-icon' src=https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png></img>
                    <p>${weather.main.temp}</p>
                    <p>${weather.wind.speed}`;
}

function updateClock(){
  const now = new Date();
  const innerHTML = `${now.getHours()%12||12}:${now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes()}:${now.getSeconds()<10?'0'+now.getSeconds():now.getSeconds()}`;
  document.body.innerHTML = innerHTML;
}

//fetchData('Tunja');
setInterval(updateClock,1000);

