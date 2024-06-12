import {
  MANGA,
  type IMangaResult,
  type IMangaChapterPage,
  type IMangaInfo,
  type ISearch,
} from "@consumet/extensions";

// Declare the interface for the AnimeService class
export interface IMangaProvider {
  // Declare the method to search for a manga by name
  // It should return a promise of ISearch<IMangaResult>
  searchManga(
    mangaName: string,
    page: number,
    limit: number
  ): Promise<ISearch<IMangaResult>>;

  // Fetch recent manga chapters
  // It should return a promise of ISearch<IMangaResult>
  fetchLatestMangaUpdates(
    page: number,
    limit: number
  ): Promise<ISearch<IMangaResult>>;

  // Fetch manga info
  // It should return a promise of IMangaInfo
  fetchMangaInfo(mangaUrl: string): Promise<IMangaInfo>;

  // Fetch chapter pages
  // It should return a promise of IMangaChapterPage[]
  fetchMangaChapterPages(chapterUrl: string): Promise<IMangaChapterPage[]>;

  // Fetch popular manga
  // It should return a promise of ISearch<IMangaResult>
  fetchPopularManga(page: number): Promise<ISearch<IMangaResult>>;

  // Fetch random manga
  // It should return a promise of ISearch<IMangaResult>
  fetchRandomManga(): Promise<ISearch<IMangaResult>>;

  // Fetch recently added manga
  // It should return a promise of ISearch<IMangaResult>
  fetchRecentlyAddedManga(page: number): Promise<ISearch<IMangaResult>>;
}

/**
 * Represents a Manga Provider that implements the IMangaProvider interface.
 */
export class MangaProvider implements IMangaProvider {
  /**
   * Declare the provider as a private field, it can be changed to any of the ANIME enum values.
   */
  private provider = new MANGA.MangaDex();

  /**
   * Searches for manga by name.
   * @param mangaName - The name of the manga to search for.
   * @param page - The page number of the search results.
   * @param limit - The maximum number of search results per page.
   * @returns A promise that resolves to the search results.
   * @throws An error if the search fails.
   */
  searchManga(
    mangaName: string,
    page: number,
    limit: number
  ): Promise<ISearch<IMangaResult>> {
    try {
      return this.provider.search(mangaName, page, limit);
    } catch (error) {
      throw new Error(`Failed to search manga by name: ${mangaName}`);
    }
  }

  /**
   * Fetches the latest manga updates.
   * @param page - The page number of the updates.
   * @param limit - The maximum number of updates per page.
   * @returns A promise that resolves to the latest manga updates.
   * @throws An error if fetching the updates fails.
   */
  fetchLatestMangaUpdates(
    page: number,
    limit: number
  ): Promise<ISearch<IMangaResult>> {
    try {
      return this.provider.fetchLatestUpdates(page, limit);
    } catch (error) {
      throw new Error(`Failed to fetch recent manga chapters`);
    }
  }

  /**
   * Fetches the information of a manga.
   * @param mangaUrl - The URL of the manga.
   * @returns A promise that resolves to the manga information.
   * @throws An error if fetching the manga info fails.
   */
  fetchMangaInfo(mangaUrl: string): Promise<IMangaInfo> {
    try {
      return this.provider.fetchMangaInfo(mangaUrl);
    } catch (error) {
      throw new Error(`Failed to fetch manga info for ${mangaUrl}`);
    }
  }

  /**
   * Fetches the pages of a manga chapter.
   * @param chapterUrl - The URL of the manga chapter.
   * @returns A promise that resolves to the manga chapter pages.
   * @throws An error if fetching the chapter pages fails.
   */
  fetchMangaChapterPages(chapterUrl: string): Promise<IMangaChapterPage[]> {
    try {
      return this.provider.fetchChapterPages(chapterUrl);
    } catch (error) {
      throw new Error(`Failed to fetch chapter pages for ${chapterUrl}`);
    }
  }

  /**
   * Fetches popular manga.
   * @param page - The page number of the popular manga.
   * @returns A promise that resolves to the popular manga.
   * @throws An error if fetching the popular manga fails.
   */
  fetchPopularManga(page: number): Promise<ISearch<IMangaResult>> {
    try {
      return this.provider.fetchPopular(page);
    } catch (error) {
      throw new Error(`Failed to fetch popular manga`);
    }
  }

  /**
   * Fetches a random manga.
   * @returns A promise that resolves to the random manga.
   * @throws An error if fetching the random manga fails.
   */
  fetchRandomManga(): Promise<ISearch<IMangaResult>> {
    try {
      return this.provider.fetchRandom();
    } catch (error) {
      throw new Error(`Failed to fetch random manga`);
    }
  }

  /**
   * Fetches recently added manga.
   * @param page - The page number of the recently added manga.
   * @returns A promise that resolves to the recently added manga.
   * @throws An error if fetching the recently added manga fails.
   */
  fetchRecentlyAddedManga(page: number): Promise<ISearch<IMangaResult>> {
    try {
      return this.provider.fetchRecentlyAdded(page);
    } catch (error) {
      throw new Error(`Failed to fetch recently added manga`);
    }
  }
}
