import Elysia from "elysia";
import { AnimeService } from "./services/anime-service";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";

// Import Services
const animeService = new AnimeService();

new Elysia()
  .use(cors())
  .use(swagger({
    path: '/api/v1/swagger',
  }))
  .get('/', () => "Welcome to AnimeFlix REST API")
  .get('/api/v1/anime/search', ({ query }) => {
    return animeService.searchAnimeByQuery(query.q)
  })
  .get('/api/v1/anime/episode/sources', ({ query }) => {
    return animeService.getEpisodeSourcesByNameAndEpisodeNumber(query.name, query.episodeNumber)
  })
  .get('/api/v1/anime/episode/servers', ({ query }) => {
    return animeService.getEpisodeServersByEpisodeId(query.episodeId)
  })
  .get('/api/v1/anime/recent', ({ query }) => {
    return animeService.getRecentEpisodes(query.page)
  })
  .get('/api/v1/anime/top', ({ query }) => {
    return animeService.getTopAiring(query.page)
  })
  .get('/api/v1/anime/list', ({ query }) => {
    return animeService.getAnimeList(query.page)
  })
  .get('/api/v1/anime/:name', ({ params }) => {
    return animeService.getAnimeInfo(params.name)
  })
  .onError(({ code }) => {
    if (code === 'NOT_FOUND')
        return 'Route not found :('
  })
  .listen(8080)

console.log('Server started on port 8080')