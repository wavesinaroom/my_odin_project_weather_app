let weatherRequest = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=e942fee8ce99d54e6ce8e15ee38866d4';
let geoRequest = 'http://api.openweathermap.org/geo/1.0/direct?q=Berlin&appid=e942fee8ce99d54e6ce8e15ee38866d4';
let city;

fetch(geoRequest)
  .then(function(response){
    alert('Did it');
    return response.json();
  })
  .then(function(response){
    console.log(response[0].lat);
  })
  .catch(function(err){
    alert('Failed');
  });
