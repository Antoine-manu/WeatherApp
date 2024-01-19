import {Place} from "../class/Place";
import axios from "axios";

export function findLocation(search: string, response: any){
    const apiUrl = `https://geocode.maps.co/search?q=${search}&api_key=65a4fed00e84b807084661tisfc7f77`
    const places: Place[] = []
    axios.get(apiUrl)
        .then((rep: {data: Place[]}) => {
            Object.values(rep.data).forEach((item: Place) => {
                places.push(item)
            })
            return response.json({places: places});
        })
        .catch((error: object) => {
            console.error(error);
            return response.json({error : error});
        });
}