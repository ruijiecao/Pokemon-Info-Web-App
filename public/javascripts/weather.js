var allElements = document.getElementsByTagName("*");
var allIds = [];
for (var i = 0, n = allElements.length; i < n; ++i) {
  var el = allElements[i];
  if (el.id) { allIds.push(el.id); }
}
console.log(allIds);



const initialize = function () {

  var weatherNewYork = document.getElementById("weatherNewYork");
  const cityNameNewYork = 'New York'
  let weatherNameNewYork = 'Wrong'
  const locationNewYork = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityNameNewYork + '&appid=3949349c25b869527071c7055fc887ef'
  const putWeatherNewYork = async function () {
    await fetch(locationNewYork).then(response => response.json()).then(wdata => {
      weatherNameNewYork = wdata.weather[0].main
      weatherNewYork.innerHTML = '    Current weather of ' + wdata.name + ': \n' + weatherNameNewYork + ' \n(' + 'Current temperature: \n'+ wdata.main.temp + 'K)'
    })
  }
  putWeatherNewYork();
  
  var weatherChicago = document.getElementById("weatherChicago");
  const cityNameChicago = 'Chicago'
  let weatherNameChicago = 'Wrong'
  const locationChicago = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityNameChicago + '&appid=3949349c25b869527071c7055fc887ef'
  const putWeatherChicago = async function () {
    await fetch(locationChicago).then(response => response.json()).then(wdata => {
      weatherNameChicago = wdata.weather[0].main
      weatherChicago.innerHTML = '    Current weather of ' + wdata.name + ': \n' + weatherNameChicago + ' \n(' + 'Current temperature: \n'+ wdata.main.temp + 'K)'
    })
  }
  putWeatherChicago();
  
  var weatherPrague = document.getElementById("weatherPrague");
  const cityNamePrague = 'Prague'
  let weatherNamePrague = 'Wrong'
  const locationPrague = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityNamePrague + '&appid=3949349c25b869527071c7055fc887ef'
  const putWeatherPrague = async function () {
    await fetch(locationPrague).then(response => response.json()).then(wdata => {
      weatherNamePrague = wdata.weather[0].main
      weatherPrague.innerHTML = '    Current weather of ' + wdata.name + ': \n' + weatherNamePrague + ' \n(' + 'Current temperature: \n'+ wdata.main.temp + 'K)'
    })
  }
  putWeatherPrague();
}

const clickButton = function () {

    const cityName = cityInput.value
    const box = document.createElement('div')
    box.setAttribute('class', 'box')
    let weatherName = 'Wrong'
    const location = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=3949349c25b869527071c7055fc887ef'
    const putWeather = async function () {
      await fetch(location).then(response => response.json()).then(wdata => {
        const weather = document.createElement('div')
        weather.setAttribute('class', 'weather')
        weather.innerHTML = 'Your city name is wrong'
        box.appendChild(weather)
        weatherName = wdata.weather[0].main
        weather.innerHTML = '    Current weather of ' + wdata.name + ': \n\r' + weatherName 
        + ' \n\r(' + 'Current temperature: \n\r'+ wdata.main.temp + 'K)'
         + " \n\r -- The intesting image about this weather is: "
      })
      await fetch('https://api.giphy.com/v1/gifs/search?api_key=An1dPM9FgR2Na7s3pG4fYL2UZoY1WGyL&q=' + weatherName + '&limit=5').then(response => response.json()).then(idata => {
        const image = document.createElement('img')
        image.setAttribute('class', 'image')
        image.src = idata.data[0].images.fixed_height_small_still.url
        box.appendChild(image)
      })
      document.getElementById("weatherImg").appendChild(box)
    }
    return putWeather()

}
const cityInput = document.getElementById("searchWeather");
const buttonName = document.getElementById("submitWeatherBtn");
buttonName.addEventListener('click', clickButton);

initialize();

