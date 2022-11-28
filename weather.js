let start, end;

function fetchData(city) {
  const geoRequest = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=e942fee8ce99d54e6ce8e15ee38866d4`;
  fetch(geoRequest)
    .then(function (response) {
      start = window.performance.now();
      return response.json();
    })
    .then(function(response){
      fetchWeather(response[0].lat, response[0].lon);
    })
    .catch(function (err) {
      alert("Unknown city");
    });
}

function fetchWeather(lat, lon){
  const weatherRequest = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=e942fee8ce99d54e6ce8e15ee38866d4`;
  fetch(weatherRequest,{ mode: "cors" })
    .then(async function (response) {
       return response.json();
    })
    .then(function (response) {
      console.dir(response);
      end = window.performance.now();
      displayWeather(response);
      displayClock();
      setInterval(displayClock,1000);
    })
    .catch(function (err) {
      alert("Sorry, an error just ocurred");
    });
}

function displayWeather(weather){
  document.body.innerHTML += `<div id = 'forecast'>
                              <div id = 'clock'></div>
                              <p>${weather.sys.country}</p>
                              <p>${weather.name}</p>
                              <p>latitude: ${weather.coord.lat}</p>
                              <p>longitude: ${weather.coord.lon}</p>
                              <p>${weather.weather[0].description}</p>
                              <img alt='weather-icon' src=https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png></img>
                              <p>${weather.main.temp}</p>
                              <p>${weather.wind.speed}</p>
                              <p>Fetched in ${end-start}</p> 
                              </div>`;
}

function displayClock(){
  const now = new Date();
  document.getElementById('clock').innerHTML = `Local time ${now.getHours()%12||12}:${now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes()}:${now.getSeconds()<10?'0'+now.getSeconds():now.getSeconds()}`;
}

const renderUserForm = function(){
  document.body.innerHTML = `<form>
                            <input type='text' placeholder='Type your city' id='user-input'></input>
                            <label for='units'>Choose your units</label>
                            <div id='units-selector'>
                            <input type = 'radio'>Metrics</input>
                            <input type = 'radio'>Imperial</input>
                            </div>
                            </form>`
  document.body.firstChild.addEventListener('submit', (e)=>{
    fetchData(document.getElementById('user-input').value);
    e.preventDefault();
  });

}();

//fetchData('Berlin');
