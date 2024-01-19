import { Weather } from "./Weather";
import express from "express";

const PORT = 3500;
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

  server.get("/forecast", async(_request, response) => {
    if(_request.query.location) {
      const weather: Weather = new Weather(_request.query.location.toString())
      await weather.setCurrent()
      return response.json(weather)
    } else {
      throw new Error('Parameter `city` not found')
    }

  })

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
  });
}

main();
