# Weather App

A weather app that is responsive and uses an weather API. I used HTML, CSS, JavaScript, Express and Nodemod to create this project.

## Documentation

I used
[Weather API](https://www.weatherapi.com/)
to extract the data for today's weather and for the next 5 days.

When the user opens the application, they will get a prompt from the browser that asks them for the current location. The user will get a "wants to know your location " prompt, if the user accepts, the application will show the weather of the current day and the next 5 days for the current location. In the case in which the user blocks the location prompt or the browser does not support geolocation, the application will automatically open with the date and weather in Cluj-Napoca.

The user can search for any other location in the world by name or by latitude and longitude. The application will show the temperature, a very suggestive icon of the current weather, how the weather feels like, current data, wind speed, humidity and UV.

The application has night and day time theme, base on the time in the search location.

## Installation

Clone the repository from my github and install node modules.

```bash
  git clone git@github.com:SilviaPapara/Weather_App.git
  cd Weather_App
  npm install
```

Run the project

```bash
npm run dev

```

## Screenshots

![App Screenshot Day Theme](https://i.imgur.com/sbIrU5q.jpeg)

![App Screenshot Night Theme](https://i.imgur.com/x4z5RpS.jpeg)
