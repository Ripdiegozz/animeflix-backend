import { t } from "elysia";
import { App } from "@/infrastructure/web/index";
import { MangaService } from "@/services/manga-service";

// Inject the manga service
const mangaService = new MangaService();

/**
 * Defines the routes for manga-related endpoints.
 * @param app - The Express application.
 * @returns The modified Express application.
 */
export default (app: typeof App) => {
  // @ts-ignore -> Ignore the warning
  app
    .get(
      "/search",
      /**
       * Search for a manga by query.
       * @param query - The query parameters.
       * @returns The search results.
      */
      // @ts-expect-error - Ignore the error because cannot cast the response to a specific schema
      ({ query }) => {
        const { q, page } = query;
        return mangaService.searchMangaByQuery(q, page);
      },
      {
        query: t.Object({
          q: t.String({
            description: "The query to search for. Ex: evangelion",
            default: "",
          }),
          page: t.String({ default: "1" }),
        }),
        response: {
          200: t.Object(
            {
              currentPage: t.Number(),
              results: t.Array(
                t.Object({
                  id: t.String(),
                  title: t.String(),
                  altTitles: t.Array(t.Object(t.Any())),
                  status: t.String(),
                  releaseDate: t.Union([t.Number(), t.Null()]),
                  contentRating: t.String(),
                  lastVolume: t.Union([t.String(), t.Null()]),
                  lastChapter: t.Union([t.String(), t.Null()]),
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
      "/info",
      /**
       * Get manga info by URL.
       * @param query - The query parameters.
       * @returns The manga info.
      */
      // @ts-expect-error - Ignore the error because cannot cast the response to a specific schema
      ({ query }) => {
        const { mangaId } = query;
        return mangaService.getMangaInfo(mangaId);
      },
      {
        query: t.Object({
          mangaId: t.String({
            description:
              "The manga id to retrieve. Ex: aaedcbda-ea61-4e7b-8143-7a475f327fbf (Neon Genesis Evangelion)",
          }),
        }),
        response: {
          200: t.Object(
            {
              id: t.String(),
              title: t.String(),
              altTitles: t.Array(t.Object(t.Any())),
              description: t.Object(t.Any()),
              genres: t.Array(t.String()),
              themes: t.Array(t.String()),
              status: t.String(),
              releaseDate: t.Union([t.Number(), t.Null()]),
              chapters: t.Array(
                t.Object({
                  id: t.String(),
                  title: t.String(),
                  chapterNumber: t.String(),
                  volumeNumber: t.String(),
                  pages: t.Number(),
                })
              ),
              image: t.String(),
            },
            { description: "Manga info retrieved correctly by URL." }
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
       * Get manga list by page.
       * @param query - The query parameters.
       * @returns The manga list.
      */
      // @ts-expect-error - Ignore the error because cannot cast the response to a specific schema
      ({ query }) => {
        const { page } = query;
        return mangaService.getMangaList(page);
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
              results: t.Array(
                t.Object({
                  id: t.String(),
                  title: t.String(),
                  altTitles: t.Array(t.Object(t.Any())),
                  status: t.String(),
                  releaseDate: t.Union([t.Number(), t.Null()]),
                  contentRating: t.String(),
                  lastVolume: t.Union([t.String(), t.Null()]),
                  lastChapter: t.Union([t.String(), t.Null()]),
                })
              ),
            },
            { description: "Manga list retrieved correctly." }
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
       * Get recent manga by page.
       * @param query - The query parameters.
       * @returns The recent manga.
      */
      // @ts-expect-error - Ignore the error because cannot cast the response to a specific schema
      ({ query }) => {
        const { page } = query;
        return mangaService.getRecentManga(page);
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
              results: t.Array(
                t.Object({
                  id: t.String(),
                  title: t.String(),
                  altTitles: t.Array(t.Object(t.Any())),
                  status: t.String(),
                  releaseDate: t.Union([t.Number(), t.Null()]),
                  contentRating: t.String(),
                  lastVolume: t.Union([t.String(), t.Null()]),
                  lastChapter: t.Union([t.String(), t.Null()]),
                })
              ),
            },
            { description: "Recent manga retrieved correctly." }
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
      "/popular",
      /**
       * Get popular manga by page.
       * @param query - The query parameters.
       * @returns The popular manga.
      */
      // @ts-expect-error - Ignore the error because cannot cast the response to a specific schema
      ({ query }) => {
        const { page } = query;
        return mangaService.getPopularManga(page);
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
              results: t.Array(
                t.Object({
                  id: t.String(),
                  title: t.String(),
                  altTitles: t.Array(t.Object(t.Any())),
                  status: t.String(),
                  releaseDate: t.Union([t.Number(), t.Null()]),
                  contentRating: t.String(),
                  lastVolume: t.Union([t.String(), t.Null()]),
                  lastChapter: t.Union([t.String(), t.Null()]),
                })
              ),
            },
            { description: "Popular manga retrieved correctly." }
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
      "/random",
      /**
       * Get random manga.
       * @returns The random manga.
      */
      // @ts-expect-error - Ignore the error because cannot cast the response to a specific schema
      () => {
        return mangaService.getRandomManga();
      },
      {
        response: {
          200: t.Object(
            {
              currentPage: t.Number(),
              results: t.Array(
                t.Object({
                  id: t.String(),
                  title: t.String(),
                  altTitles: t.Array(t.Object(t.Any())),
                  status: t.String(),
                  releaseDate: t.Union([t.Number(), t.Null()]),
                  contentRating: t.String(),
                  lastVolume: t.Union([t.String(), t.Null()]),
                  lastChapter: t.Union([t.String(), t.Null()]),
                })
              ),
            },
            { description: "Random manga retrieved correctly." }
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
