import {Request, Response} from "express";
import {Weather} from "../class/Weather";
import {Place} from "../class/Place";
import {createConnection} from "typeorm";
import {all} from "axios";

import {weatherFromLongAndLat} from "../services/weatherService";

export async function addPlace(request: Request, response: Response) {
    const place = await Place.createNew(request.body.name, request.body.apiId , request.body.lon, request.body.lat)
    return response.json(place);
}

export function removePlace(request: Request, response: Response) {
    const id: number = parseInt(request.params.id)
    const place: Place = Place.findOneById(id)
    Place.remove(place)
    return response.status(200)
}

export function getPlace(request: Request, response: Response) {
    const places = Place.getAllWeather()
    return response.json({places : places});
}

export function getSinglePlace(request: Request, response: Response) {
    const id = request.params.id
    const place = Place.findOneById(id)
    return response.json(place);
}

export async function findWeather(request: Request, response: Response) {
    if (request.query.latitude && request.query.longitude && !Array.isArray(request.query.latitude) && !Array.isArray(request.query.longitude) && request.query.name && !Array.isArray(request.query.name)) {
        const place = new Place();
        place.latitude = parseInt(request.query.latitude as string);
        place.longitude = parseInt(request.query.longitude as string);
        place.name = request.query.name as string;
        let weather = new Weather(place);
        await weather.setCurrent()
        return response.json(weather)
    } else {
        return response.status(400).json({message: 'Parameter `name`, `latitude` or `longitude` is not found'})
    }
}