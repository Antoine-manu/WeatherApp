import {Place} from "../class/Place";
import axios from "axios";

export function findLocation(search: string, response: any){
    const apiUrl = `https://geocode.maps.co/search?q=${search}&api_key=65a4fed00e84b807084661tisfc7f77`
    const places: Place[] = []
    axios.get(apiUrl)
        .then((rep: {data: []}) => {
            Object.values(rep.data).forEach((item: {lat: number, lon: number, place_id: number, display_name: string}) => {
                const place = new Place();
                place.longitude = item.lon;
                place.latitude = item.lat;
                place.apiId = item.place_id;
                place.name = item.display_name;
                places.push(place)
            })
            return response.json({places: places});
        })
        .catch((error: object) => {
            console.error(error);
            return response.json({error : error});
        });
}