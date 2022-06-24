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
    return `${day}, ${date} ${mounth}, ${hours}:${minutes}`;
}

function formatDayForcast(timestemp){
  let date = new Date(timestemp*1000);
  let day = date.getDay();
  let days = ["Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun"]

  return days[day];
}

function displayForcast(response){
  console.log(response.data);
  let forcast = response.data.daily;
  let forcaseElement = document.querySelector("#forcast");
  let forcastHTML = `<div class="row">`;
  forcast.forEach(function(forcastDay,index) {
    if (index<6){
     forcastHTML = forcastHTML + `        
          <div class="col" >
            <div class="day-of-the-week">${formatDayForcast(forcastDay.dt)}</div>
             <img src="http://openweathermap.org/img/wn/${forcastDay.weather[0].icon}@2x.png" width="50" height="50" />
              <div class="day-temp">
               <span class="max-day-temp">${Math.round(forcastDay.temp.max)}°C</span>
               <span class="mim-day-temp">${Math.round(forcastDay.temp.min)}°C</span>
              </div>
            </div>`;
     }
  })  
  
  forcastHTML = forcastHTML + `</div>`;  
  forcaseElement.innerHTML = forcastHTML;
              
}
function getForcast (coordinates){
  let apiKey = "28380c9029ac812a2a683ccc768f6493";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForcast);

}

function getTemp(response){
    let currentTemp = document.querySelector("#degrees-temp");
    let currentCity = document.querySelector("#seached-city");
    let currentHumidity = document.querySelector(".humidity");
    let currentDescription = document.querySelector(".todayweather");
    let currentWind = document.querySelector(".wind");
    let currentPressure = document.querySelector(".pressure");
    let currentDate = document.querySelector(".todayIs");
    let currentIcon = document.querySelector("#icon");

    celsiumTemp = response.data.main.temp;

    currentTemp.innerHTML = Math.round (celsiumTemp);
    currentCity.innerHTML = response.data.name;
    currentHumidity.innerHTML = response.data.main.humidity;
    currentDescription.innerHTML = response.data.weather[0].description;
    currentWind.innerHTML = Math.round(response.data.wind.speed);
    currentPressure.innerHTML = response.data.main.pressure;
    currentDate.innerHTML = formatData(response.data.dt * 1000);
    currentIcon.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    currentIcon.setAttribute ("alt", response.data.weather[0].description);

    getForcast(response.data.coord);
}

function search (city){
let apiKey = "28380c9029ac812a2a683ccc768f6493";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(getTemp)
}

function userInputCity(event){
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
 }

 function displayCelsiumTemp(event){
  event.preventDefault();
   let tempC = document.querySelector("#degrees-temp");
   tempC.innerHTML = Math.round(celsiumTemp);
 }

let formInput = document.querySelector("#search-form");
formInput.addEventListener("submit", userInputCity);

search("Vinnytsia");