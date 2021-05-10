require("dotenv").config();
import axios from "axios";

const lon = 77.4977;
const lat = 27.2046;

const getWeatherData = async () => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`
  );
  const data = await response.data;
  console.log(
    `${data.daily[0].weather[0].description}. It is currently ${data.current.temp} degrees out there. There is ${data.current.clouds}% chance of raining.`
  );
};

getWeatherData();
