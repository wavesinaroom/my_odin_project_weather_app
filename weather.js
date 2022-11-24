function fetchWeatherData(city){
  const geoRequest = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=e942fee8ce99d54e6ce8e15ee38866d4`;
  fetch(geoRequest)
    .then(function(response){
      return response.json();
    })
    .then(function(response){
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${response[0].lat}&lon=${response[0].lon}&appid=e942fee8ce99d54e6ce8e15ee38866d4`,{mode: 'cors'})
        .then(function(response){
          return response.json();
        })
        .then(function(response){
          console.log(response);
        })
        .catch(function(err){
          alert('Sorry, an error just ocurred');
        });
    })
  .catch(function(err){
    alert('Unknown city');
  });
}

fetchWeatherData('lkdjfg');
