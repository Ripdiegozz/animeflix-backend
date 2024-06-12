import { t } from "elysia";
import { App } from "@/index";
import { AnimeService } from "@/services/anime-service";

// Inject services availables in the application
const animeService = new AnimeService();

/**
 * Defines the routes for anime-related endpoints.
 * @param app - The ElysiaJS application.
 * @returns The modified ElysiaJS application.
 */
export default (app: typeof App) => {
  app
    .get(
      "/search",
      /**
       * Search for an anime by query.
       * @param query - The query parameters.
       * @returns The search results.
      */
      // @ts-expect-error - Ignore the error because cannot cast the response to a specific schema
      ({ query }) => {
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
      /**
       * Get episode sources by name and episode number.
       * @param query - The query parameters.
       * @returns The episode sources.
       */
      ({ query }) => {
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
      /**
       * Get episode servers by episode id.
       * @param query - The query parameters.
       * @returns The episode servers.
       */
      ({ query }) => {
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
      /**
       * Get recent episodes.
       * @param query - The query parameters.
       * @returns The recent episodes.
      */
      // @ts-expect-error - Ignore the error because cannot cast the response to a specific schema
      ({ query }) => {
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
      /**
       * Get top airing animes.
       * @param query - The query parameters.
       * @returns The top airing animes.
      */
      // @ts-expect-error - Ignore the error because cannot cast the response to a specific schema
      ({ query }) => {
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
      /**
       * Get anime list.
       * @param query - The query parameters.
       * @returns The anime list.
      */
      // @ts-expect-error - Ignore the error because cannot cast the response to a specific schema
      ({ query }) => {
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
      /**
       * Get anime info by name.
       * @param params - The route parameters.
       * @returns The anime info.
      */
      // @ts-expect-error - Ignore the error because cannot cast the response to a specific schema
      ({ params }) => {
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
