// Paima oro sąlygas iš API
fetch('https://api.meteo.lt/v1/places/vilnius/forecasts/long-term', {mode: 'no-cors'} )
  .then(response => response.json())

  .then(data => {
    // Priskiria kintamuosius iš API - dabartinės oro sąlygos
    const conditionCode = data.forecastTimestamps[0].conditionCode;

    // Gaunama vieta, kur bus atvaizduojama icona
    const weatherIcon = document.getElementById('weather-icon');

    // Įterpia ikoną į HTML - kreipiasi į žemiau aprašytą funkciją getWeatherIcon()
    weatherIcon.innerHTML = getWeatherIcon(conditionCode);

    // Duomenų saugojimas į localStorage
    localStorage.setItem('weatherCondition', conditionCode);
    localStorage.setItem('city', 'Vilnius');
    localStorage.setItem('date', new Date().toISOString());
  })

  .catch(error => {
    console.error('Įvyko klaida gaunant oro sąlygas:', error);
  });

// Funkcija grąžina webfont ikoną pagal oro sąlygą
function getWeatherIcon(conditionCode) {
  let iconClass = '';

  // Priskirti ikoną pagal oro sąlygą
  switch (conditionCode) {
    case 'clear':
      iconClass = 'wi wi-day-sunny';
      break;
    case 'isolated-clouds':
      iconClass = 'wi wi-day-cloudy';
      break;
    case 'overcast':
      iconClass = 'wi wi-cloudy';
      break;
    case 'sleet':
      iconClass = 'wi wi-rain';
      break;
    case 'snowstorm':
      iconClass = 'wi wi-snow';
      break;
    case 'fog':
      iconClass = 'wi wi-fog';
      break;
    default:
      iconClass = 'wi wi-na';
      break;
  }

  return `<i class="${iconClass}"></i>`;
}
