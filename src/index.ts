import Elysia, { t } from "elysia";
import { AnimeService } from "./services/anime-service";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Logestic } from "logestic";
// import jwt from "@elysiajs/jwt"; Prepare the JWT service for future use

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
    swagger({
      documentation: {
        info: {
          title: "Animeflix REST API",
          version: "0.0.1",
          description:
            "REST API specification for Animeflix - A simple anime and manga streaming service",
        },
        tags: [
          { name: "Anime", description: "Anime related endpoints" },
          { name: "Default", description: "Default endpoints" },
        ],
      },
      scalarConfig: {
        theme: "alternate",
      },
      provider: "scalar",
    })
  )
  // Log all requests to the console
  .use(Logestic.preset("fancy"))
  // Define the routes for the API
  .get("/", () => Bun.file("src/static/index.html"), {
    tags: ["Default"],
    response: {
      200: t.Any({ description: "Index page retrieved correctly." })
    }
  }) // Root route
  .get(
    "/api/v1/anime/search",
    // @ts-expect-error - Ignore the error because cannot cast the response to a specific squema
    ({ query }) => {
      // Search an anime by query
      const { q, page } = query;

      return animeService.searchAnimeByQuery(q, page);
    },
    {
      query: t.Object({
        q: t.String(),
        page: t.String({ default: "1" }),
      }),
      tags: ["Anime"],
      response: {
        200: t.Object(
          {
            currentPage: t.Number(),
            hasNextPage: t.Boolean(),
            results: t.Array(
              t.Object({
                id: t.String(),
                title: t.String(),
                url: t.String(),
                image: t.String(),
                releaseDate: t.String(),
                subOrDub: t.String(),
              })
            ),
          },
          { description: "Search results retrieved correctly by query." }
        ),
        500: t.Object(
          {
            name: t.String(),
            message: t.String(),
          },
          { description: "Internal server error." }
        ),
      },
    }
  )
  .get(
    "/api/v1/anime/episode/sources",
    ({ query }) => {
      // Get episode sources by name and episode number
      const { animeName, episodeNumber } = query;

      return animeService.getEpisodeSourcesByNameAndEpisodeNumber(
        animeName,
        episodeNumber
      );
    },
    {
      query: t.Object({
        animeName: t.String(),
        episodeNumber: t.String(),
      }),
      tags: ["Anime"],
      response: {
        200: t.Object(
          {
            headers: t.Object({
              Referer: t.String(),
            }),
            sources: t.Array(
              t.Object({
                url: t.String(),
                isM3U8: t.Boolean(),
                quality: t.String(),
              })
            ),
            download: t.String(),
          },
          {
            description:
              "Episode sources retrieved correctly by name and episode number.",
          }
        ),
        500: t.Object(
          {
            name: t.String(),
            message: t.String(),
          },
          { description: "Internal server error." }
        ),
      },
    }
  )
  .get(
    "/api/v1/anime/episode/servers",
    ({ query }) => {
      // Get episode servers by episode id
      const { episodeId } = query;

      return animeService.getEpisodeServersByEpisodeId(episodeId);
    },
    {
      query: t.Object({
        episodeId: t.String(),
      }),
      tags: ["Anime"],
      response: {
        200: t.Array(
          t.Object({
            name: t.String(),
            url: t.String(),
          }),
          { description: "Episode servers retrieved correctly by episode id." }
        ),
        500: t.Object(
          {
            name: t.String(),
            message: t.String(),
          },
          { description: "Internal server error." }
        ),
      },
    }
  )
  .get(
    "/api/v1/anime/recent",
    // @ts-expect-error - Ignore the error because cannot cast the response to a specific squema
    ({ query }) => {
      // Get recent episodes
      const { page } = query;

      return animeService.getRecentEpisodes(page);
    },
    {
      query: t.Object({
        page: t.String({ default: "1" }),
      }),
      tags: ["Anime"],
      response: {
        200: t.Object(
          {
            currentPage: t.Number(),
            hasNextPage: t.Boolean(),
            results: t.Array(
              t.Object({
                id: t.String(),
                episodeId: t.String(),
                episodeNumber: t.Number(),
                title: t.String(),
                image: t.String(),
                url: t.String(),
              })
            ),
          },
          { description: "Recent episodes retrieved correctly." }
        ),
        500: t.Object(
          {
            name: t.String(),
            message: t.String(),
          },
          { description: "Internal server error." }
        ),
      },
    }
  )
  .get(
    "/api/v1/anime/top",
    // @ts-expect-error - Ignore the error because cannot cast the response to a specific squema
    ({ query }) => {
      // Get top airing animes
      const { page } = query;

      return animeService.getTopAiring(page);
    },
    {
      query: t.Object({
        page: t.String({ default: "1" }),
      }),
      tags: ["Anime"],
      response: {
        200: t.Object(
          {
            currentPage: t.Number(),
            hasNextPage: t.Boolean(),
            results: t.Array(
              t.Object({
                id: t.String(),
                title: t.String(),
                image: t.String(),
                url: t.String(),
                genres: t.Array(t.String()),
                episodeId: t.String(),
                episodeNumber: t.Number(),
              })
            ),
          },
          { description: "Top airing animes retrieved correctly." }
        ),
        500: t.Object(
          {
            name: t.String(),
            message: t.String(),
          },
          { description: "Internal server error." }
        ),
      },
    }
  )
  .get(
    "/api/v1/anime/list",
    // @ts-expect-error - Ignore the error because cannot cast the response to a specific squema
    ({ query }) => {
      // Get anime list
      const { page } = query;

      return animeService.getAnimeList(page);
    },
    {
      query: t.Object({
        page: t.String({ default: "1" }),
      }),
      tags: ["Anime"],
      response: {
        200: t.Object(
          {
            animes: t.Array(
              t.Object({
                id: t.String(),
                title: t.String(),
                image: t.String(),
                url: t.String(),
                genres: t.Array(t.String()),
                releaseDate: t.String(),
              })
            ),
          },
          { description: "Anime list retrieved correctly." }
        ),
        500: t.Object(
          {
            name: t.String(),
            message: t.String(),
          },
          { description: "Internal server error." }
        ),
      },
    }
  )
  .get(
    "/api/v1/anime/:animeName",
    // @ts-expect-error - Ignore the error because cannot cast the response to a specific squema
    ({ params }) => {
      // Get anime info by name
      const { animeName } = params;

      return animeService.getAnimeInfo(animeName);
    },
    {
      params: t.Object({
        animeName: t.String(),
      }),
      tags: ["Anime"],
      response: {
        200: t.Object(
          {
            id: t.String(),
            title: t.String(),
            url: t.String(),
            genres: t.Array(t.String()),
            totalEpisodes: t.Number(),
            image: t.String(),
            releaseDate: t.String(),
            description: t.String(),
            subOrDub: t.String(),
            type: t.String(),
            status: t.String(),
            otherName: t.String(),
            episodes: t.Array(
              t.Object({
                id: t.String(),
                number: t.Number(),
                url: t.String(),
              })
            ),
          },
          { description: "Anime info retrieved correctly by name." }
        ),
        500: t.Object(
          {
            name: t.String(),
            message: t.String(),
          },
          { description: "Internal server error." }
        ),
      },
    }
  )
  .onError(({ code }) => {
    // Handle errors
    if (code === "NOT_FOUND") return Bun.file("src/static/404.html");
  })
  .listen(8080);

console.log("🦊 Animeflix REST API is running on http://localhost:8080/ 🚀");
console.log(
  "📚 Check the API documentation at http://localhost:8080/swagger 📖"
);
