import { AnimeProvider } from "@/model/anime-model"
import type { IAnimeResult, ISearch } from "@consumet/extensions";

interface IAnimeService {
  searchAnimeByQuery(query: string | undefined): Promise<ISearch<IAnimeResult>>;

  getEpisodeSourcesByNameAndEpisodeNumber(animeName: string | undefined, episodeNumber: string | undefined): Promise<any>;
}

// Declare the AnimeService class
// It implements singleton pattern to ensure only one instance of the class is created
export class AnimeService implements IAnimeService {
  // Declare the instance field as a private static field
  static #instance: AnimeService;

  private animeProvider = new AnimeProvider();

  searchAnimeByQuery = async (query: string | undefined) => {
    if (!query) throw new Error('Query is required');

    return await this.animeProvider.searchAnime(query);
  }

  getEpisodeSourcesByNameAndEpisodeNumber(animeName: string | undefined, episodeNumber: string | undefined): Promise<any> {
    if (!animeName) throw new Error('Anime name is required');
    if (!episodeNumber) throw new Error('Episode number is required');

    return this.animeProvider.getEpisodeSourcesByNameAndEpisodeNumber(animeName, episodeNumber);
  }

  // getter for the instance field, it returns the instance of the class and creates one if it doesn't exist
  public static get instance(): AnimeService {
    if (!AnimeService.#instance) {
      AnimeService.#instance = new AnimeService();
    }

    return AnimeService.#instance;
}
}
