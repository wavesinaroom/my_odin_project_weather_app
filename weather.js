let geoRequest = 'http://api.openweathermap.org/geo/1.0/direct?q=Berlin&appid=e942fee8ce99d54e6ce8e15ee38866d4';
let city;

fetch(geoRequest)
  .then(function(response){
    alert('Did it');
    return response.json();
  })
  .then(function(response){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${response[0].lat}&lon=${response[0].lon}&appid=appid=e942fee8ce99d54e6ce8e15ee38866d4`,{mode: 'cors'})
      .then(function(response){
        return response.json();
      })
      .then(function(response){
        console.log(response);
      })
      .catch(function(err){
        alert('No weather');
      });
  })
  .catch(function(err){
    alert('Failed');
  });
console.dir(city);

