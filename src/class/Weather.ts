import { TemperatureUnit } from "../types";
import { WEATHER_CODES } from "../weather-codes";
import { getTemperatureFahrenheit } from "../services/temperatureService";
import {Place} from "./Place";
import {weatherFromLongAndLat} from "../services/weatherService";

export class Weather {
  place: Place;
  temperatureCelsius?: number;
  weatherCode?: number;

  constructor(place: Place) {
    this.place = place;
  }

  async setCurrent(): Promise<void> {
    const newWeather = await weatherFromLongAndLat(this.place)
    this.temperatureCelsius = newWeather.current.temperature_2m;
    this.weatherCode = newWeather.current.weather_code;
  }

  print(temperatureUnit: TemperatureUnit = "CELSIUS"): void {
    if (this.temperatureCelsius === undefined || this.weatherCode === undefined) {
      throw new Error(
        `No weather data found for city ${this.place.name}: run \`setCurrent\` on Weather object.`
      );
    }

    const icon: string = WEATHER_CODES[this.weatherCode].icon;
    const text: string = WEATHER_CODES[this.weatherCode].text;

    const temperature = Math.round(
      temperatureUnit === "CELSIUS"
        ? this.temperatureCelsius
        : getTemperatureFahrenheit(this.temperatureCelsius)
    );
    const shortTemperatureUnit = temperatureUnit === "CELSIUS" ? "C" : "F";

    console.log(
      "┌" +
        "-".repeat(
          45 +
            (text.length + icon.length >= 20 ? text.length + icon.length : 18)
        ) +
        "┐"
    );
    console.log(
      `| City   | Temperature (°${shortTemperatureUnit}) | Weather Description`
    );
    console.log(
      "|" +
        "-".repeat(
          45 +
            (text.length + icon.length >= 20 ? text.length + icon.length : 18)
        ) +
        "|"
    );
    console.log(
      `| ${this.place.name}   | ${temperature}°${shortTemperatureUnit}             | ${icon} ${text}`
    );
    console.log(
      "└" +
        "-".repeat(
          45 +
            (text.length + icon.length >= 20 ? text.length + icon.length : 18)
        ) +
        "┘"
    );
  }
}
