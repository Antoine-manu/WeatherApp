
import express, {Request, Response} from "express";
import {Weather} from "../class/Weather";

export function addFavorite(request: Request, response: Response){
    return true;
}

export function removeFavorite(request: Request, response: Response){
    const id = request.params.id
    return false;
}

export function getFavorite(request: Request, response: Response){
    return false;
}

export function getSingleFavorite(request: Request, response: Response){
    const id = request.params.id
    return false;
}

export async function findWeather(request: Request, response: Response){
    if(request.query.location) {
        const weather: Weather = new Weather(request.query.location.toString())
        await weather.setCurrent()
        return response.json(weather)
    } else {
        throw new Error('Parameter `city` not found')
    }

}