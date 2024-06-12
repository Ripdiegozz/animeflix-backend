import Elysia from "elysia";
import { AnimeService } from "./services/anime-service";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { html } from "@elysiajs/html";
import { Logestic } from "logestic";

// Inject services availables in the application
const animeService = new AnimeService();

// Create a new Elysia instance in order to create a new server
new Elysia()
  // Enable CORS for all routes and methods
  .use(
    cors({
      // Allow all origins (can be changed to a specific origin or an array of origins)
      origin: "*",
      // Allow only GET methods
      methods: ["GET"],
    })
  )
  // Enable Swagger for the API documentation at /api/v1/swagger
  .use(
    swagger()
  )
  .use(html())
  // Log all requests to the console
  .use(Logestic.preset("fancy"))
  // Define the routes for the API
  .get("/", () => Bun.file("src/static/index.html")) // Root route
  .get("/api/v1/anime/search", ({ query }) => {
    // Search an anime by query
    const { q, page } = query;

    return animeService.searchAnimeByQuery(q, page);
  })
  .get("/api/v1/anime/episode/sources", ({ query }) => {
    // Get episode sources by name and episode number
    const { animeName, episodeNumber } = query;

    return animeService.getEpisodeSourcesByNameAndEpisodeNumber(
      animeName,
      episodeNumber
    );
  })
  .get("/api/v1/anime/episode/servers", ({ query }) => {
    // Get episode servers by episode id
    const { episodeId } = query;

    return animeService.getEpisodeServersByEpisodeId(episodeId);
  })
  .get("/api/v1/anime/recent", ({ query }) => {
    // Get recent episodes
    const { page } = query;

    return animeService.getRecentEpisodes(page);
  })
  .get("/api/v1/anime/top", ({ query }) => {
    // Get top airing animes
    const { page } = query;

    return animeService.getTopAiring(page);
  })
  .get("/api/v1/anime/list", ({ query }) => {
    // Get anime list
    const { page } = query;

    return animeService.getAnimeList(page);
  })
  .get("/api/v1/anime/:animeName", ({ params }) => {
    // Get anime info by name
    const { animeName } = params;

    return animeService.getAnimeInfo(animeName);
  })
  .onError(({ code }) => {
    // Handle errors
    if (code === "NOT_FOUND")
      return Bun.file('src/static/404.html');
  })
  .listen(8080);

console.log("🦊 Animeflix REST API is running on http://localhost:8080/ 🚀");
console.log(
  "📚 Check the API documentation at http://localhost:8080/swagger 📖"
);
