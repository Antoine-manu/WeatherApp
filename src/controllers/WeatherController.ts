
import express, {Request, Response} from "express";

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