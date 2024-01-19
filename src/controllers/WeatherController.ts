
import express, {Request, Response} from "express";
import {Weather} from "../class/Weather";
import {weatherFromLongAndLat} from "../services/weatherService";
import {Place} from "../class/Place";

export function addPlace(request: Request, response: Response){
    return true;
}

export function removePlace(request: Request, response: Response){
    const id = request.params.id
    return false;
}

export function getPlace(request: Request, response: Response){
    return false;
}

export function getSinglePlace(request: Request, response: Response){
    const id = request.params.id
    return false;
}

export async function findWeather(request: Request, response: Response){
    if(request.query.latitude && request.query.longitude && !Array.isArray(request.query.latitude) && !Array.isArray(request.query.longitude)) {
        const place = new Place();
        place.latitude = parseInt(request.query.latitude as string);
        place.longitude = parseInt(request.query.longitude as string);
        let weather = new Weather('');
        weather = await weatherFromLongAndLat(place, weather)
        return response.json(weather)
    } else {
        return response.status(400).json({message: 'Parameter `city` not found'})
    }
}