import { AnimeProvider } from "@/domain/model/anime-model"
import type { IAnimeResult, IEpisodeServer, ISearch, ISource } from "@consumet/extensions";

interface IAnimeService {
  searchAnimeByQuery(query: string | undefined, page: string | undefined): Promise<ISearch<IAnimeResult>>;

  getEpisodeSourcesByNameAndEpisodeNumber(animeName: string | undefined, episodeNumber: string | undefined): Promise<ISource>;
  
  getEpisodeServersByEpisodeId(animeName: string | undefined, episodeNumber: string | undefined): Promise<IEpisodeServer[]>;

  getRecentEpisodes(page: string | undefined): Promise<ISearch<IAnimeResult>>;

  getTopAiring(page: string | undefined): Promise<ISearch<IAnimeResult>>;

  getAnimeInfo(animeUrl: string | undefined): Promise<IAnimeResult>;

  getAnimeList(page: string | undefined): Promise<ISearch<IAnimeResult>>;
}

// Declare the AnimeService class
// It implements singleton pattern to ensure only one instance of the class is created
export class AnimeService implements IAnimeService {
  // Declare the instance field as a private static field
  static #instance: AnimeService;

  private animeProvider = new AnimeProvider();

  searchAnimeByQuery = async (query: string | undefined, page: string | undefined) => {
    if (!query) throw new Error('Query is required');
    if (!page) page = '1';
    if (isNaN(parseInt(page))) throw new Error('Page must be a number');

    return await this.animeProvider.searchAnime(query, parseInt(page));
  }

  getEpisodeSourcesByNameAndEpisodeNumber = async (animeName: string | undefined, episodeNumber: string | undefined): Promise<any> => {
    if (!animeName) throw new Error('Anime name is required');
    if (!episodeNumber) throw new Error('Episode number is required');

    return await this.animeProvider.fetchEpisodeSourcesByNameAndEpisodeNumber(animeName, episodeNumber);
  }

  getEpisodeServersByEpisodeId = async (episodeId: string | undefined): Promise<IEpisodeServer[]> => {
    if (!episodeId) throw new Error('Anime name is required');

    return await this.animeProvider.fetchEpisodeServersByEpisodeId(episodeId);
  }

  getRecentEpisodes = async (page: string | undefined) => {
    if (!page) page = '1'
    if (isNaN(parseInt(page))) throw new Error('Page must be a number');

    return await this.animeProvider.fetchRecentEpisodes(parseInt(page));
  }

  getTopAiring = async (page: string | undefined) => {
    if (!page) page = '1'
    if (isNaN(parseInt(page))) throw new Error('Page must be a number');

    return await this.animeProvider.fetchTopAnimesAiring(parseInt(page));
  }

  getAnimeList = async (page: string | undefined) => {
    if (!page) page = '1'
    if (isNaN(parseInt(page))) throw new Error('Page must be a number');

    return await this.animeProvider.fetchAnimeList(parseInt(page));
  }

  getAnimeInfo(animeUrl: string | undefined): Promise<IAnimeResult> {
    if (!animeUrl) throw new Error('Anime URL is required');

    return this.animeProvider.fetchAnimeInfo(animeUrl);
  }

  // getter for the instance field, it returns the instance of the class and creates one if it doesn't exist
  public static get instance(): AnimeService {
    if (!AnimeService.#instance) {
      AnimeService.#instance = new AnimeService();
    }

    return AnimeService.#instance;
  }
}
