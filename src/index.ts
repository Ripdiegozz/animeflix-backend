import Elysia from "elysia";
import { AnimeService } from "./services/anime-service";

// Import Services
const animeService = new AnimeService();

const server = new Elysia()
  .get('/anime/search', ({ query }) => {
    return animeService.searchAnimeByQuery(query.q)
  })
  .get('/anime/episode/sources', ({ query }) => {
    return animeService.getEpisodeSourcesByNameAndEpisodeNumber(query.name, query.episodeNumber)
  })
  .onError(({ code }) => {
    if (code === 'NOT_FOUND')
        return 'Route not found :('
  })
  .listen(3000)

console.log('Server started on port 3000')