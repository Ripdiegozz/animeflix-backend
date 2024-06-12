import { t } from "elysia";
import { App } from "@/index";
import { MangaService } from "@/services/manga-service";

// Inject the manga service
const mangaService = new MangaService();

export default (app: typeof App) => {
  // @ts-ignore -> Ignore the warning
  app
    .get(
      "/search",
      // @ts-expect-error - Ignore the error because cannot cast the response to a specific squema
      ({ query }) => {
        // Search a manga by query
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
      // @ts-expect-error - Ignore the error because cannot cast the response to a specific squema
      ({ query }) => {
        // Get manga info by url
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
            { description: "Manga info retrieved correctly by url." }
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
        // Get manga list by page
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
      // @ts-expect-error - Ignore the error because cannot cast the response to a specific squema
      ({ query }) => {
        // Get recent manga by page
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
      // @ts-expect-error - Ignore the error because cannot cast the response to a specific squema
      ({ query }) => {
        // Get popular manga by page
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
      // @ts-expect-error - Ignore the error because cannot cast the response to a specific squema
      () => {
        // Get random manga
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
