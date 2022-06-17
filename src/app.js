function getTemp(response){
    console.log(response)
    let currentTemp = document.querySelector("#degrees-temp");
    let currentCity = document.querySelector("#seached-city");
    let currenHumidity = document.querySelector(".humidity");
    let currenDescription = document.querySelector(".weather");
    let currenWind = document.querySelector(".wind");
    let currenPressure = document.querySelector(".pressure");
    currentTemp.innerHTML = Math.round (response.data.main.temp);
    currentCity.innerHTML = response.data.name;
    currenHumidity.innerHTML = response.data.main.humidity;
    currenDescription.innerHTML = response.data.weather[0].description;
    currenWind.innerHTML = Math.round(response.data.wind.speed);
    currenPressure.innerHTML = response.data.main.pressure;
}
let apiKey = "28380c9029ac812a2a683ccc768f6493";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=Kiev&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(getTemp)