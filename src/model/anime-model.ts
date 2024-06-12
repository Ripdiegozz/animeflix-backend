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
  searchAnime(animeName: string, page: number): Promise<ISearch<IAnimeResult>>;

  // Fetch recent anime episodes
  fetchRecentEpisodes(page: number): Promise<ISearch<IAnimeResult>>

  // Fetch episode servers by name and episode number
  fetchEpisodeServersByEpisodeId(episodeId: string): Promise<IEpisodeServer[]>

  // Fetch top airing animes
  fetchTopAnimesAiring(page: number): Promise<ISearch<IAnimeResult>>

  // Fetch Anime Info
  fetchAnimeInfo(animeUrl: string): Promise<IAnimeResult>
}

/**
 * Represents an AnimeProvider that implements the IAnimeProvider interface.
 * This class provides methods to fetch anime episode sources, episode servers, search anime, fetch recent episodes,
 * fetch top airing animes, fetch anime info, and fetch anime list.
 */
export class AnimeProvider implements IAnimeProvider {
  private provider = new ANIME.Gogoanime();

  /**
   * Fetches the episode sources for a given anime name and episode number.
   * @param animeName - The name of the anime.
   * @param episodeNumber - The episode number.
   * @returns A promise that resolves to the episode sources.
   * @throws An error if the episode sources cannot be fetched.
   */
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

  /**
   * Fetches the episode servers for a given episode ID.
   * @param episodeId - The ID of the episode.
   * @returns A promise that resolves to the episode servers.
   * @throws An error if the episode servers cannot be fetched.
   */
  fetchEpisodeServersByEpisodeId(episodeId: string): Promise<IEpisodeServer[]> {
    try {
      return this.provider.fetchEpisodeServers(episodeId);
    } catch (error) {
      throw new Error(`Failed to fetch episode servers for episode ${episodeId}`);
    }
  }

  /**
   * Searches for an anime by name and page number.
   * @param animeName - The name of the anime.
   * @param page - The page number.
   * @returns A promise that resolves to the search results.
   * @throws An error if the anime search fails.
   */
  searchAnime(animeName: string, page: number): Promise<ISearch<IAnimeResult>> {
    try {
      return this.provider.search(animeName, page);
    } catch (error) {
      throw new Error(`Failed to search anime by name: ${animeName}`);
    }
  }

  /**
   * Fetches the recent episodes by page number.
   * @param page - The page number.
   * @returns A promise that resolves to the search results.
   * @throws An error if the recent episodes cannot be fetched.
   */
  fetchRecentEpisodes(page: number): Promise<ISearch<IAnimeResult>> {
    try {
      return this.provider.fetchRecentEpisodes(page);
    } catch (error) {
      throw new Error(`Failed to fetch recent episodes`);
    }
  }

  /**
   * Fetches the top airing animes by page number.
   * @param page - The page number.
   * @returns A promise that resolves to the search results.
   * @throws An error if the top airing animes cannot be fetched.
   */
  fetchTopAnimesAiring(page: number): Promise<ISearch<IAnimeResult>> {
    try {
      return this.provider.fetchTopAiring(page);
    } catch (error) {
      throw new Error(`Failed to fetch top airing animes`);
    }
  }

  /**
   * Fetches the anime info for a given anime URL.
   * @param animeUrl - The URL of the anime.
   * @returns A promise that resolves to the anime info.
   * @throws An error if the anime info cannot be fetched.
   */
  fetchAnimeInfo(animeUrl: string): Promise<IAnimeResult> {
    try {
      return this.provider.fetchAnimeInfo(animeUrl);
    } catch (error) {
      throw new Error(`Failed to fetch anime info for ${animeUrl}`);
    }
  }

  /**
   * Fetches the anime list by page number.
   * @param page - The page number.
   * @returns A promise that resolves to the search results.
   * @throws An error if the anime list cannot be fetched.
   */
  fetchAnimeList(page: number): Promise<ISearch<IAnimeResult>> {
    try {
      return this.provider.fetchAnimeList(page);
    } catch (error) {
      throw new Error(`Failed to fetch anime list`);
    }
  }
}
