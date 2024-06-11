import { ANIME, type IAnimeResult, type ISearch, type ISource } from "@consumet/extensions";

// Declare the interface for the AnimeService class
interface IAnimeProvider {
  // Declare the method to get the episode sources by name and episode number
  // It should return a promise of string array
  getEpisodeSourcesByNameAndEpisodeNumber(
    animeName: string,
    episodeNumber: string
  ): Promise<ISource>;

  // Declare the method to search for an anime by name
  // It should return a promise of ISearch<IAnimeResult>
  searchAnime(animeName: string): Promise<ISearch<IAnimeResult>>;
}

export class AnimeProvider implements IAnimeProvider{
  // Declare the provider as a private field, it can be changed to any of the ANIME enum values
  private provider = new ANIME.Gogoanime();

  getEpisodeSourcesByNameAndEpisodeNumber(
    animeName: string,
    episodeNumber: string
  ): Promise<ISource> {
    return this.provider.fetchEpisodeSources(`${animeName}-episode-${episodeNumber}`);
  }

  searchAnime(animeName: string): Promise<ISearch<IAnimeResult>> {
    return this.provider.search(animeName);
  }
}
