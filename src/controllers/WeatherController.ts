import {Request, Response} from "express";
import {Weather} from "../class/Weather";
import {Place} from "../class/Place";
import {createConnection} from "typeorm";
import {all} from "axios";

import {weatherFromLongAndLat} from "../services/weatherService";

export async function addPlace(request: Request, response: Response) {
    await Place.createNew(request.body.place.name, 0, request.body.place.lon, request.body.place.lat)
    return true;
}

export function removePlace(request: Request, response: Response) {
    const id = request.params.id
    return false;
}

export function getPlace(request: Request, response: Response) {
    createConnection()
        .then(async connection => {
            const yourEntityRepository = connection.getRepository(Place);
            const places = await yourEntityRepository.find();
            console.log('Tous les éléments :', places);
            return response.json({data : places})
            await connection.close();
        })
        .catch(error => console.log('Erreur :', error));
    return false;
}

export function getSinglePlace(request: Request, response: Response) {
    const id = request.params.id
    return false;
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