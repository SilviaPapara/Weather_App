const temperature = document.querySelector(".temperature");
const city = document.querySelector(".city");
const searchBar = document.querySelector(".searchBar");
const searchBtn = document.querySelector(".searchBtn");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const feelsLike = document.querySelector(".feelsLike");
const weatherImg = document.querySelector(".weatherImg");
const searchIcon = document.querySelector(".searchIcon");
const condition = document.querySelector(".condition");
const uvIndex = document.querySelector(".uvIndex");
const currentDate = document.getElementById("currentDate");

const apiKey = "806d3fb59c964c6a88b185148230604";
const apiURL = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}`;

async function checkWeather(queryCity) {
  const response = await fetch(apiURL + `&q=${queryCity}&aqi=no`);
  let data = await response.json();

  const icon = data.current.condition.icon;

  city.innerHTML = data.location.name + ", " + data.location.region;
  temperature.innerHTML = Math.round(data.current.temp_c) + "°C";
  condition.innerHTML = data.current.condition.text;
  humidity.innerHTML = "Humidity: " + data.current.humidity + "%";
  wind.innerHTML = "Wind: " + data.current.wind_kph + "km/h";
  feelsLike.innerHTML =
    "Feels like " + Math.round(data.current.feelslike_c) + "°C";

  let uvLevel = parseInt(data.current.uv);
  let uvText;

  if ([1, 2].includes(uvLevel)) {
    uvText = "(Low)";
  } else if ([3, 4, 5].includes(uvLevel)) {
    uvText = "(Moderate)";
  } else if ([6, 7].includes(uvLevel)) {
    uvText = "(High)";
  } else if ([8, 9, 10].includes(uvLevel)) {
    uvText = "(Very High)";
  } else {
    uvText = "Invalid UV level";
  }

  uvIndex.innerHTML = "UV index: " + data.current.uv + " " + uvText;
  weatherImg.innerHTML = `<img src="https:${icon}" alt="Icon">`;

  if (data.current.is_day == "1") {
    setGradientBackground("#4a7797", "#e3bb80", "#71add7", "#e3da80");
  } else {
    setGradientBackground("#4a4cbc", "#084d78", "#020614", "#20214e");
  }

  let today = data.location.localtime;
  let datetime_obj = new Date(today.slice(0, 10));

  const options = { weekday: "long" };
  const dayName = datetime_obj.toLocaleString("en-US", options);
  const monthName = datetime_obj.toLocaleString("default", { month: "short" });

  let dayOfMonth = datetime_obj.getDate();
  let year = datetime_obj.getFullYear();

  let formattedDate =
    dayName + ", " + dayOfMonth + " " + monthName + " " + year;

  currentDate.innerHTML = formattedDate;
}

searchIcon.addEventListener("click", () => {
  checkWeather(searchBar.value);
  fillWeekWeather(searchBar.value);
  searchBar.value = "";
});
searchBar.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    checkWeather(searchBar.value);
    fillWeekWeather(searchBar.value);
    searchBar.value = "";
  }
});

const weatherDayNode = document.querySelectorAll(".weatherDay");
const fillWeekWeather = async (queryCity) => {
  const response = await fetch(
    apiURL + `&q=${queryCity}&days=6&aqi=no&alerts=no`
  );
  let data = await response.json();

  const arrayWeek = data.forecast.forecastday.map((day) => day);
  arrayWeek.shift();

  arrayWeek.forEach((day, index) => {
    const iconUrl = day.day.condition.icon;
    const div = document.createElement("div");
    div.innerHTML = `<img src="https:${iconUrl}" alt="Icon">`;

    const dayName = day.date;
    const date = new Date(dayName);
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });

    weatherDayNode[index].innerHTML = `
    <div><b>${dayOfWeek}</b></div>
    <div>${div.outerHTML}</div>
    <div>${day.day.condition.text} </div>
    <div><b>${Math.round(day.day.avgtemp_c)} °C</b></div>
    
    `;
  });
};

function setGradientBackground(color1, color2, color3, color4) {
  document.body.style.background = `linear-gradient(-45deg, ${color1}, ${color2}, ${color3}, ${color4})`;
  document.body.style.backgroundSize = "400% 400%";

  const keyframes = `
    @keyframes gradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    `;

  const styleSheet = document.createElement("style");
  styleSheet.innerHTML = keyframes;
  document.head.appendChild(styleSheet);

  document.body.style.animation = "gradient 15s ease infinite";
}

window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let locationString = latitude + "," + longitude;
        checkWeather(locationString);
        fillWeekWeather(locationString);
      },
      function () {
        alert("User block access to location.");
        checkWeather("cluj");
        fillWeekWeather("cluj");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
    checkWeather("cluj");
    fillWeekWeather("cluj");
  }
};
