import {Place} from "../class/Place";
import {Weather} from "../class/Weather";

export async function weatherFromLongAndLat(place : Place){
    const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,weather_code`
    );
    const newWeather = (await weatherResponse.json()) as {
        current: { temperature_2m: number; weather_code: number };
    };
    return newWeather
}