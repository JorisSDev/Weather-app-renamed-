const url = 'https://corsproxy.io/?' + encodeURIComponent('https://api.meteo.lt/v1/places/vilnius/forecasts/long-term');

// Paima oro sąlygas iš API
fetch(url)
  .then(response => response.json())
  .then(data => {
    // Priskiria kintamuosius iš API - dabartinės oro sąlygos
    const conditionCode = data.forecastTimestamps[0].conditionCode;

    // Gaunama vieta, kur bus atvaizduojama icona
    const weatherIcon = document.getElementById('weather-icon');

    // Įterpiama ikoną į HTML - kreipiasi į getWeatherIcon()
    weatherIcon.innerHTML = getWeatherIcon(conditionCode);

    console.log('Data:', data);
    console.log('conditionCode:', conditionCode);

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
      iconClass = 'bi bi-sun';
      break;
    case 'partly-cloudy':
      iconClass = 'bi bi-cloud-sun';
      break;
    case 'variable-cloudiness':
      iconClass = 'bi bi-clouds';
      break;
    case 'cloudy-with-sunny-intervals':
      iconClass = 'bi bi-cloud-sun';
      break;
    case 'cloudy':
      iconClass = 'bi bi-cloud';
      break;
    case 'thunder':
      iconClass = 'bi bi-cloud-lightning-rain';
      break;
    case 'isolated-thunderstorms':
      iconClass = 'bi bi-cloud-lightning-rain';
      break;
    case 'thunderstorms':
      iconClass = 'bi bi-cloud-lightning-rain';
      break;
    case 'light-rain':
      iconClass = 'bi bi-cloud-drizzle';
      break;
    case 'rain':
      iconClass = 'bi bi-cloud-rain';
      break;
    case 'heavy-rain':
      iconClass = 'bi bi-cloud-rain-heavy';
      break;
    case 'rain-showers':
      iconClass = 'bi bi-cloud-rain-heavy';
      break;
    case 'light-rain-at-times':
      iconClass = 'bi bi-cloud-drizzle';
      break;
    case 'rain-at-times':
      iconClass = 'bi bi-cloud-rain';
      break;
    case 'light-sleet':
      iconClass = 'bi bi-cloud-drizzle';
      break;
    case 'sleet':
      iconClass = 'bi bi-cloud-drizzle';
      break;
    case 'sleet-at-times':
      iconClass = 'bi bi-cloud-drizzle';
      break;
    case 'sleet-showers':
      iconClass = 'bi bi-cloud-drizzle';
      break;
    case 'freezing-rain':
      iconClass = 'bi bi-cloud-drizzle';
      break;
    case 'hail':
      iconClass = 'bi bi-cloud-hail';
      break;
    case 'light-snow':
      iconClass = 'bi bi-cloud-snow';
      break;
    case 'snow':
      iconClass = 'bi bi-cloud-snow';
      break;
    case 'heavy-snow':
      iconClass = 'bi bi-cloud-snow';
      break;
    case 'snow-showers':
      iconClass = 'bi bi-cloud-snow';
      break;
    case 'snow-at-times':
      iconClass = 'bi bi-cloud-snow';
      break;
    case 'light-snow-at-times':
      iconClass = 'bi bi-cloud-snow';
      break;
    case 'snowstorm':
      iconClass = 'bi bi-cloud-snow';
      break;
    case 'mist':
      iconClass = 'bi bi-cloud-haze';
      break;
    case 'fog':
      iconClass = 'bi bi-cloud-haze';
      break;
    case 'squall':
      iconClass = 'bi bi-cloud-haze';
      break;
    default:
      iconClass = 'bi bi-question-circle';
      break
  }

  return `<i class="${iconClass}"></i>`;
}
