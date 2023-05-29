// Paima oro sąlygas iš API
const url = 'https://corsproxy.io/?' + encodeURIComponent('https://api.meteo.lt/v1/places/vilnius/forecasts/long-term');
fetch(url)
  .then(response => response.json())

  .then(data => {
    // Priskiria kintamuosius iš API - dabartinės oro sąlygos
    const conditionCode = data.forecastTimestamps[0].conditionCode;

    // Gaunama vieta, kur bus atvaizduojama icona
    const weatherIcon = document.getElementById('weather-icon');

    // Įterpia ikoną į HTML - kreipiasi į žemiau aprašytą funkciją getWeatherIcon()
    weatherIcon.innerHTML = getWeatherIcon(conditionCode);

    console.log('Data:', data);
    console.log('conditionCode:', conditionCode);
    console.log('Icon:', weatherIcon);

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
    case 'cloudy':
      iconClass = 'bi bi-clouds';
      break;
    case 'clear':
      iconClass = 'bi bi-sun';
      break;
    case 'isolated-clouds':
      iconClass = 'bi bi-cloud-sun';
      break;
    case 'overcast':
      iconClass = 'bi bi-clouds';
      break;
    case 'sleet':
      iconClass = 'bi bi-cloud-rain';
      break;
    case 'snowstorm':
      iconClass = 'bi bi-snow';
      break;
    case 'fog':
      iconClass = 'bi bi-cloud-haze';
      break;
    case 'partly-cloudy':
      iconClass = 'bi bi-cloud-sun-fill';
      break;
    case 'light-rain':
      iconClass = 'bi bi-cloud-drizzle';
      break;
    case 'moderate-rain':
      iconClass = 'bi bi-cloud-rain-heavy';
      break;
    case 'heavy-rain':
      iconClass = 'bi bi-cloud-rain';
      break;
    case 'storm':
      iconClass = 'bi bi-cloud-lightning-rain';
      break;
    case 'violent-storm':
      iconClass = 'bi bi-cloud-lightning-rain';
      break;
    case 'hail':
      iconClass = 'bi bi-cloud-hail';
      break;
    default:
      iconClass = 'bi bi-question-diamond';
      break;
  }

  return `<i class="${iconClass}"></i>`;
}
