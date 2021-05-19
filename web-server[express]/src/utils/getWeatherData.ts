require("dotenv").config();
import axios from "axios";

export const getWeatherData = async (cityName: any) => {
  let getData = {};
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );
    const data = await response.data;
    getData = {
      forecast: data.weather[0].description,
      cityName: data.name,
      coordinate: data.coord,
    };
    return getData;
  } catch (err) {
    // console.log("Something Wrong!! Try again later.");
    console.log(err);
  }
};
