import { TemperatureUnit } from "../types";
import { WEATHER_CODES } from "../weather-codes";
import { getTemperatureFahrenheit } from "../services/temperatureService";
import {Place} from "./Place";
import {weatherFromLongAndLat} from "../services/weatherService";

export class Weather {
  city: string;
  temperatureCelsius?: number;
  weatherCode?: number;

  constructor(city: string) {
    this.city = city;
  }

  async setCurrent(): Promise<void> {
    const place = new Place;
    const weather = await weatherFromLongAndLat(place, this)
  }

  print(temperatureUnit: TemperatureUnit = "CELSIUS"): void {
    if (this.temperatureCelsius === undefined || this.weatherCode === undefined) {
      throw new Error(
        `No weather data found for city ${this.city}: run \`setCurrent\` on Weather object.`
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
      `| ${this.city}   | ${temperature}°${shortTemperatureUnit}             | ${icon} ${text}`
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
