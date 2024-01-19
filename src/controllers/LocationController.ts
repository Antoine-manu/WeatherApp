import {Place} from "../class/Place";
import axios from "axios";
import url from "url";
import {findLocation} from "../services/locationService";
import express, {Request, Response} from "express";

export function locate(request: Request, response: Response){
    const search = request.query.search
    if(!search || Array.isArray(search)){
        return response.status(400).json({message: 'FF'})
    }
    findLocation(search as string, response)
}