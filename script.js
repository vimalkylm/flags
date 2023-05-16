const container = document.querySelector('.container .row');

fetch('https://restcountries.com/v2/all')
  .then(response => response.json())
  .then(data => {
    data.forEach(country => {
      const card = createCard(country);
      container.appendChild(card);

      const button = card.querySelector('.btn');
      button.addEventListener('click', () => {
        const countryCode = country.alpha2Code;
        getWeatherData(countryCode, card);
      });
    });
  })
  .catch(error => console.log(error));

function createCard(country) {
  const card = document.createElement('div');
  card.classList.add('col-lg-4', 'col-sm-12');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card', 'card-body');

  const flag = document.createElement('img');
  flag.setAttribute('src', country.flag);
  flag.classList.add('card-img-top', 'img-fluid');
  cardBody.appendChild(flag);

  const name = document.createElement('h5');
  name.classList.add('card-title');
  name.textContent = country.name;
  cardBody.appendChild(name);

  const capital = document.createElement('p');
  capital.classList.add('card-text');
  capital.textContent = `Capital: ${country.capital}`;
  cardBody.appendChild(capital);

  const region = document.createElement('p');
  region.classList.add('card-text');
  region.textContent = `Region: ${country.region}`;
  cardBody.appendChild(region);

  const codes = document.createElement('p');
  codes.classList.add('card-text');
  codes.textContent = `Country Codes: ${country.alpha2Code}, ${country.alpha3Code}`;
  cardBody.appendChild(codes);

  const button = document.createElement('button');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Click for Weather';
  cardBody.appendChild(button);

  card.appendChild(cardBody);
  return card;
}

function getWeatherData(countryCode, card) {
  const url = `https://api.openweathermap.org/data/2.5/weather?appid=YOUR_API_KEY&units=metric&lang=en&q=${countryCode}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weather = data.weather[0].description;
      const temp = data.main.temp;

      const weatherData = document.createElement('div');
      weatherData.classList.add('card', 'card-footer');

      const weatherText = document.createElement('p');
      weatherText.textContent = `Weather: ${weather}`;
      weatherData.appendChild(weatherText);

      const tempText = document.createElement('p');
      tempText.textContent = `Temperature: ${temp}°C`;
      weatherData.appendChild(tempText);

      card.appendChild(weatherData);
    })
    .catch(error => console.log(error));
}
