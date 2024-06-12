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

export class MangaProvider implements IMangaProvider {
  // Declare the provider as a private field, it can be changed to any of the ANIME enum values
  private provider = new MANGA.MangaDex();

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

  fetchMangaInfo(mangaUrl: string): Promise<IMangaInfo> {
    try {
      return this.provider.fetchMangaInfo(mangaUrl);
    } catch (error) {
      throw new Error(`Failed to fetch manga info for ${mangaUrl}`);
    }
  }

  fetchMangaChapterPages(chapterUrl: string): Promise<IMangaChapterPage[]> {
    try {
      return this.provider.fetchChapterPages(chapterUrl);
    } catch (error) {
      throw new Error(`Failed to fetch chapter pages for ${chapterUrl}`);
    }
  }

  fetchPopularManga(page: number): Promise<ISearch<IMangaResult>> {
    try {
      return this.provider.fetchPopular(page);
    } catch (error) {
      throw new Error(`Failed to fetch popular manga`);
    }
  }

  fetchRandomManga(): Promise<ISearch<IMangaResult>> {
    try {
      return this.provider.fetchRandom();
    } catch (error) {
      throw new Error(`Failed to fetch random manga`);
    }
  }

  fetchRecentlyAddedManga(page: number): Promise<ISearch<IMangaResult>> {
    try {
      return this.provider.fetchRecentlyAdded(page);
    } catch (error) {
      throw new Error(`Failed to fetch recently added manga`);
    }
  }
}
