import { t } from "elysia";
import { App } from "@/index";
import { AnimeService } from "@/services/anime-service";

// Inject services availables in the application
const animeService = new AnimeService();

export default (app: typeof App) => {
  app
    .get(
      "/search",
      // @ts-expect-error - Ignore the error because cannot cast the response to a specific squema
      ({ query }) => {
        // Search an anime by query
        const { q, page } = query;

        return animeService.searchAnimeByQuery(q, page);
      },
      {
        query: t.Object({
          q: t.String({
            description: "The query to search for. Ex: evangelion",
            default: "",
          }),
          page: t.String({
            default: "1",
            description: "The page number to retrieve. Ex: 1",
          }),
        }),
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
      "/episode/sources",
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
          animeName: t.String({
            description: "The anime id to search for. Ex: one-piece",
          }),
          episodeNumber: t.String({
            description: "The episode number to search for. Ex: 1",
          }),
        }),
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
      "/episode/servers",
      ({ query }) => {
        // Get episode servers by episode id
        const { episodeId } = query;

        return animeService.getEpisodeServersByEpisodeId(episodeId);
      },
      {
        query: t.Object({
          episodeId: t.String({
            description:
              "The episode id to search for. It is composed by 'anime-id'-episode-'episode-number' Ex: one-piece-episode-1",
          }),
        }),
        response: {
          200: t.Array(
            t.Object({
              name: t.String(),
              url: t.String(),
            }),
            {
              description: "Episode servers retrieved correctly by episode id.",
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
      "/recent",
      // @ts-expect-error - Ignore the error because cannot cast the response to a specific squema
      ({ query }) => {
        // Get recent episodes
        const { page } = query;

        return animeService.getRecentEpisodes(page);
      },
      {
        query: t.Object({
          page: t.String({
            default: "1",
            description: "The page number to retrieve. Ex: 1",
          }),
        }),
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
      "/top",
      // @ts-expect-error - Ignore the error because cannot cast the response to a specific squema
      ({ query }) => {
        // Get top airing animes
        const { page } = query;

        return animeService.getTopAiring(page);
      },
      {
        query: t.Object({
          page: t.String({
            default: "1",
            description: "The page number to retrieve. Ex: 1",
          }),
        }),
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
      "/list",
      // @ts-expect-error - Ignore the error because cannot cast the response to a specific squema
      ({ query }) => {
        // Get anime list
        const { page } = query;

        return animeService.getAnimeList(page);
      },
      {
        query: t.Object({
          page: t.String({
            default: "1",
            description: "The page number to retrieve. Ex: 1",
          }),
        }),
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
      "/:animeName",
      // @ts-expect-error - Ignore the error because cannot cast the response to a specific squema
      ({ params }) => {
        // Get anime info by name
        const { animeName } = params;

        return animeService.getAnimeInfo(animeName);
      },
      {
        params: t.Object({
          animeName: t.String({
            description: "The anime id to search for. Ex: one-piece",
          }),
        }),
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
    );

  return app;
};
