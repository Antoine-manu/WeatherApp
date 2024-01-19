import { TemperatureUnit } from "../types";
import { WEATHER_CODES } from "../weather-codes";
import { getTemperatureFahrenheit } from "../services/temperatureService";
import {Place} from "./Place";

const COORDINATES_FOR_CITIES: Place[] = [
  { display_name: "Lille", lat: 50.6365654, long: 3.0635282 },
  { display_name: "Paris", lat: 48.8534951, long: 2.3483915 },
  { display_name: "Reims", lat: 49.2577886, long: 4.031926 },
];



export class Weather {
  city: string;
  temperatureCelsius?: number;
  weatherCode?: number;

  constructor(city: string) {
    this.city = city;
  }

  async setCurrent(): Promise<void> {
    const coordinates = COORDINATES_FOR_CITIES.find(
      (_coordinates) => _coordinates.display_name === this.city
    );
    if (!coordinates) {
      throw new Error(`No coordinates found for city ${this.city}.`);
    }

    const { lat, long } = coordinates;

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,weather_code`
    );
    const weather = (await weatherResponse.json()) as {
      current: { temperature_2m: number; weather_code: number };
    };

    this.temperatureCelsius = weather.current.temperature_2m;
    this.weatherCode = weather.current.weather_code;
  }

  print(temperatureUnit: TemperatureUnit = "CELSIUS"): void {
    if (!this.temperatureCelsius || !this.weatherCode) {
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
