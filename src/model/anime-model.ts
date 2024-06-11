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
  fetchEpisodeServersByEpisodeId(episodeId: string): Promise<IEpisodeServer[]>

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
    try {
      return this.provider.fetchEpisodeSources(`${animeName}-episode-${episodeNumber}`);
    } catch (error) {
      throw new Error(`Failed to fetch episode sources for ${animeName} episode ${episodeNumber}`);
    }
  }

  fetchEpisodeServersByEpisodeId(episodeId: string): Promise<IEpisodeServer[]> {
    try {
      return this.provider.fetchEpisodeServers(episodeId);
    } catch (error) {
      throw new Error(`Failed to fetch episode servers for episode ${episodeId}`);
    }
  }

  searchAnime(animeName: string): Promise<ISearch<IAnimeResult>> {
    try {
      return this.provider.search(animeName);
    } catch (error) {
      throw new Error(`Failed to search anime by name: ${animeName}`);
    }
  }

  fetchRecentEpisodes(page: number): Promise<ISearch<IAnimeResult>> {
    try {
      return this.provider.fetchRecentEpisodes(page);
    } catch (error) {
      throw new Error(`Failed to fetch recent episodes`);
    }
  }

  fetchTopAnimesAiring(page: number): Promise<ISearch<IAnimeResult>> {
    try {
      return this.provider.fetchTopAiring(page);
    } catch (error) {
      throw new Error(`Failed to fetch top airing animes`);
    }
  }

  fetchAnimeInfo(animeUrl: string): Promise<IAnimeResult> {
    try {
      return this.provider.fetchAnimeInfo(animeUrl);
    } catch (error) {
      throw new Error(`Failed to fetch anime info for ${animeUrl}`);
    }
  }

  fetchAnimeList(page: number): Promise<ISearch<IAnimeResult>> {
    try {
      return this.provider.fetchAnimeList(page);
    } catch (error) {
      throw new Error(`Failed to fetch anime list`);
    }
  }
}
