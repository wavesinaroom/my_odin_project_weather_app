const request = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=e942fee8ce99d54e6ce8e15ee38866d4';

fetch(request)
  .then(function(response){
    alert('Did it');
  })

  .catch(function(err){
    alert('Failed');
  });
