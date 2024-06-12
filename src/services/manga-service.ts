import { MangaProvider } from "@/model/manga-model";
import type { IMangaInfo, IMangaResult, ISearch } from "@consumet/extensions";

export interface IMangaService {
    searchMangaByQuery(query: string | undefined, page: string | undefined): Promise<ISearch<IMangaResult>>;
    
    getMangaInfo(mangaUrl: string | undefined): Promise<IMangaInfo>;
    
    getMangaList(page: string | undefined): Promise<ISearch<IMangaResult>>;
    
    getRecentManga(page: string | undefined): Promise<ISearch<IMangaResult>>;
    
    getPopularManga(page: string | undefined): Promise<ISearch<IMangaResult>>;
    
    getRandomManga(): Promise<ISearch<IMangaResult>>;
}

// Declare the Manga Service Class
// It implements singleton pattern to ensure only one instance of the class is created
export class MangaService implements IMangaService {
    // Declare the instance field as a private static field
    static #instance: MangaService;

    private mangaProvider = new MangaProvider();

    searchMangaByQuery = async (query: string | undefined, page: string | undefined) => {
        if (!query) throw new Error('Query is required');
        if (!page) page = '1';
        if (isNaN(parseInt(page))) throw new Error('Page must be a number');

        return await this.mangaProvider.searchManga(query, parseInt(page), 10);
    }

    getMangaInfo = async (mangaUrl: string | undefined) => {
        if (!mangaUrl) throw new Error('Manga URL is required');

        return await this.mangaProvider.fetchMangaInfo(mangaUrl);
    }

    getMangaList = async (page: string | undefined) => {
        if (!page) page = '1';
        if (isNaN(parseInt(page))) throw new Error('Page must be a number');

        return await this.mangaProvider.fetchRecentlyAddedManga(parseInt(page));
    }

    getRecentManga = async (page: string | undefined) => {
        if (!page) page = '1';
        if (isNaN(parseInt(page))) throw new Error('Page must be a number');

        return await this.mangaProvider.fetchLatestMangaUpdates(parseInt(page), 10);
    }

    getPopularManga = async (page: string | undefined) => {
        if (!page) page = '1';
        if (isNaN(parseInt(page))) throw new Error('Page must be a number');

        return await this.mangaProvider.fetchPopularManga(parseInt(page));
    }

    getRandomManga = async () => {
        return await this.mangaProvider.fetchRandomManga();
    }

    // Declare the static method to get the instance of the class
    static getInstance() {
        if (!MangaService.#instance) {
            MangaService.#instance = new MangaService();
        }

        return MangaService.#instance;
    }
}
