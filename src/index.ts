import { Weather } from "./class/Weather";
import express from "express";
import {Place} from "./class/Place";
import {locate} from "./controllers/LocationController";
import {addFavorite, getFavorite, getSingleFavorite, removeFavorite} from "./controllers/WeatherController";
const axios = require('axios');
const http = require('http');
const url = require('url');

const PORT = 3501;
async function main() {
  const server = express();

  server.get("/", (_request, response) => {
    return response.json({ message: "Hello world!" });
  });

  server.get("/weather", async (_request, response) => {
    const weather = new Weather("Lille");
    await weather.setCurrent();
    return response.json(weather);
  });

  server.get("/locations", locate);

  server.get("/favorite/:id", getSingleFavorite);

  server.post("/favorite", addFavorite);

  server.delete("/favorite/:id", removeFavorite);

  server.get("/favorite", getFavorite);


  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
  });
}

main();
