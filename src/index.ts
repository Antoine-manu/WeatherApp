import { Weather } from "./class/Weather";
import express from "express";
import {Place} from "./class/Place";
import { DataSource } from 'typeorm'
import {locate} from "./controllers/LocationController";
import {
  addFavorite,
  findWeather,
  getFavorite,
  getSingleFavorite,
  removeFavorite
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

  server.get("/forecast", findWeather)

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
  });
}

main();
