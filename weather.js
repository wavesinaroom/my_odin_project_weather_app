let start, end;

function fetchData(city, units) {
  const geoRequest = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=e942fee8ce99d54e6ce8e15ee38866d4`;
  fetch(geoRequest)
    .then(function (response) {
      start = window.performance.now();
      return response.json();
    })
    .then(function(response){
      fetchWeather(response[0].lat, response[0].lon, units);
    })
    .catch(function (err) {
      alert("Unknown city");
    });
}

function fetchWeather(lat, lon, units){
  const weatherRequest = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=e942fee8ce99d54e6ce8e15ee38866d4`;
  fetch(weatherRequest,{ mode: "cors" })
    .then(async function (response) {
       return response.json();
    })
    .then(function (response) {
      console.dir(response);
      end = window.performance.now();
      displayWeather(response);
      displayClock(response);
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
                              <p>temperature: ${weather.main.temp}</p>
                              <p>min temperature: ${weather.main.temp_min}</p>
                              <p>Fetched in ${end-start} ms</p> 
                              </div>`;
}

function displayClock(weather){
  let now = new Date();
  document.getElementById('clock').innerHTML = `Local time ${now.getHours()%12||12}:${now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes()}:${now.getSeconds()<10?'0'+now.getSeconds():now.getSeconds()}`;
}

function tempFormatOnLoad(){
  if(document.getElementById('celsius').checked === true){
    return 'metric';
  }else if(document.getElementById('farenheit').checked === true){
    return 'imperial';
  }else{
    return undefined; 
  }
}

const renderUserForm = function(){
  document.body.innerHTML = `<form>
                            <input type='text' placeholder='Type your city' id='user-input'></input>
                            <div id='units-selector'>
                            <input id='farenheit' type = 'radio' name = 'temperature'>F°</input>
                            <input id='celsius' type = 'radio' name = 'temperature'>C°</input>
                            </div>
                            </form>`
  document.body.firstChild.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(tempFormatOnLoad()!=undefined)
      fetchData(document.getElementById('user-input').value,tempFormatOnLoad());
    else
      alert('no temp scale');
      return;
  });

}();

