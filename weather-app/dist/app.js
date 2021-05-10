"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const axios_1 = __importDefault(require("axios"));
const lon = 77.4977;
const lat = 27.2046;
const getWeatherData = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`);
    const data = yield response.data;
    console.log(`${data.daily[0].weather[0].description}. It is currently ${data.current.temp} degrees out there. There is ${data.current.clouds}% chance of raining.`);
});
getWeatherData();
//# sourceMappingURL=app.js.map