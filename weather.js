let start, end;

function fetchData(city, units) {
  const geoRequest = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=e942fee8ce99d54e6ce8e15ee38866d4`;
  fetch(geoRequest)
    .then(function (response) {
      start = window.performance.now();
      return response.json();
    })
    .then(function(response){
      console.dir(response);
      fetchWeather(response[0].lat, response[0].lon, units);
      //fetchTimeZone(response[0].lat, response[0].lon);
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
      end = window.performance.now();
      displayWeather(response);
      displayClock(response);
    })
    .catch(function (err) {
      alert("Sorry, an error just ocurred");
    });
}

function fetchTimeZone(lat, lon){
  const timeZoneRequest = `https://api.ipgeolocation.io/timezone?apiKey=9ba82911df22421086132e9e7c1facad&lat=${lat}&lon=${lon}`;
  fetch(timeZoneRequest, {mode: 'cors'})
    .then(function (response){
      return response.json();
    }).then(function(response){
      console.dir(response);
    })
    .catch(function(err){
      alert('Sorry, time couldn\'t be fetched');
    })
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
                              <p>Fetched in ${end-start} ms</p> 
                              </div>`;
}

function displayClock(){
  let where = new Date().toLocaleString([], {timeZone: "Asia/Dhaka"});
  let now = new Date(where); 

  document.getElementById('clock').innerHTML = `Local time ${now.getHours()}:${now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes()}:${now.getSeconds()<10?'0'+now.getSeconds():now.getSeconds()} `;
  setTimeout(function(){
    displayClock();
  }, 1000);
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
  document.body.addEventListener('submit', (e)=>{
    e.preventDefault();
    const tempScale = tempFormatOnLoad();
    if(tempScale!=undefined)
      fetchData(document.getElementById('user-input').value,tempScale);
    else
      alert('no temp scale');
      return;
  });

}();

