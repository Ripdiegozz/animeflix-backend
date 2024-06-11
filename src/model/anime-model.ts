import { ANIME, type IAnimeResult, type IEpisodeServer, type ISearch, type ISource } from "@consumet/extensions";

// Declare the interface for the AnimeService class
export interface IAnimeProvider {
  // Declare the method to get the episode sources by name and episode number
  // It should return a promise of string array
  fetchEpisodeSourcesByNameAndEpisodeNumber(
    animeName: string,
    episodeNumber: string
  ): Promise<ISource>;

  // Declare the method to search for an anime by name
  // It should return a promise of ISearch<IAnimeResult>
  searchAnime(animeName: string): Promise<ISearch<IAnimeResult>>;

  // Fetch recent anime episodes
  fetchRecentEpisodes(page: number): Promise<ISearch<IAnimeResult>>

  // Fetch episode servers by name and episode number
  fetchEpisodeServersByNameAndEpisodeNumber(animeName: string, episodeNumber: string): Promise<IEpisodeServer[]>

  // Fetch top airing animes
  fetchTopAnimesAiring(page: number): Promise<ISearch<IAnimeResult>>

  // Fetch Anime Info
  fetchAnimeInfo(animeUrl: string): Promise<IAnimeResult>
}

export class AnimeProvider implements IAnimeProvider{
  // Declare the provider as a private field, it can be changed to any of the ANIME enum values
  private provider = new ANIME.Gogoanime();

  fetchEpisodeSourcesByNameAndEpisodeNumber(
    animeName: string,
    episodeNumber: string
  ): Promise<ISource> {
    return this.provider.fetchEpisodeSources(`${animeName}-episode-${episodeNumber}`);
  }

  fetchEpisodeServersByNameAndEpisodeNumber(episodeId: string): Promise<IEpisodeServer[]> {
    return this.provider.fetchEpisodeServers(episodeId);
  }

  searchAnime(animeName: string): Promise<ISearch<IAnimeResult>> {
    return this.provider.search(animeName);
  }

  fetchRecentEpisodes(page: number): Promise<ISearch<IAnimeResult>> {
    return this.provider.fetchRecentEpisodes(page);
  }

  fetchTopAnimesAiring(page: number): Promise<ISearch<IAnimeResult>> {
    return this.provider.fetchTopAiring(page);
  }

  fetchAnimeInfo(animeUrl: string): Promise<IAnimeResult> {
    return this.provider.fetchAnimeInfo(animeUrl);
  }

  fetchAnimeList(page: number): Promise<ISearch<IAnimeResult>> {
    return this.provider.fetchAnimeList(page);
  }
}
