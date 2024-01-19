import { Weather } from "./class/Weather";
import express from "express";
import {Place} from "./class/Place";
import { DataSource } from 'typeorm'
import {locate} from "./controllers/LocationController";
import {
  addPlace,
  findWeather,
  getPlace,
  getSinglePlace,
  removePlace
} from "./controllers/WeatherController";

const dataSource = new DataSource({
  type: "sqlite",
  database: "./sqlite.db",
  entities: [Place],
  synchronize: true
})

const PORT = 3500;
async function main() {
  await dataSource.initialize();
  const server = express();

  server.get("/", (_request, response) => {
    return response.json({ message: "Hello world!" });
  });

  server.get("/search/places", locate);

  server.get("/places/:id/forecast", getSinglePlace);

  server.post("/places", addPlace);

  server.delete("/places/:id", removePlace);

  server.get("/places", getPlace);

  server.get("/forecast", findWeather)

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
  });
}

main();
