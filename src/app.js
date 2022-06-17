function formatData(timestemp){
    let now= new Date(timestemp);
    let date = now.getDate()
    let hours = now.getHours();
        if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = now.getMinutes();
        if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"];
    let day = days[now.getDay()];

    let mounths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"];
    let mounth = mounths[now.getMonth()];
    return `${day}, ${date} ${mounth}, ${hours}:${minutes}`
}

function getTemp(response){
    console.log(response)
    let currentTemp = document.querySelector("#degrees-temp");
    let currentCity = document.querySelector("#seached-city");
    let currentHumidity = document.querySelector(".humidity");
    let currentDescription = document.querySelector(".weather");
    let currentWind = document.querySelector(".wind");
    let currentPressure = document.querySelector(".pressure");
    let currentDate = document.querySelector(".todayIs");
    currentTemp.innerHTML = Math.round (response.data.main.temp);
    currentCity.innerHTML = response.data.name;
    currentHumidity.innerHTML = response.data.main.humidity;
    currentDescription.innerHTML = response.data.weather[0].description;
    currentWind.innerHTML = Math.round(response.data.wind.speed);
    currentPressure.innerHTML = response.data.main.pressure;
    currentDate.innerHTML = formatData(response.data.dt * 1000);
}
let apiKey = "28380c9029ac812a2a683ccc768f6493";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=Kiev&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(getTemp)